package org.example.service.impl;

import org.example.dao.api.*;
import org.example.input.PasswordInput;
import org.example.input.UserInput;
import org.example.model.*;
import org.example.security.Secured;
import org.example.service.api.UserService;
import org.example.type.*;

import javax.persistence.NoResultException;
import javax.ws.rs.*;
import javax.ws.rs.core.*;
import java.security.Principal;
import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

@Secured({RoleType.USER, RoleType.ADMIN})
public class UserServiceImpl implements UserService {

    private UserDAO userDAO;
    private AddressDAO addressDAO;
    private OrderDAO orderDAO;
    private RewardDAO rewardDAO;
    private StatisticDAO statisticDAO;

    @Override
    @GET
    @Path("/me")
    @Produces(MediaType.APPLICATION_JSON)
    public Response fetchUserData(@Context SecurityContext securityContext) {
        try {
            Principal principal = securityContext.getUserPrincipal();
            Integer userId = Integer.parseInt(principal.getName());
            User user = userDAO.findById(userId).orElseThrow(Exception::new);
            return Response.ok(user).build();
        } catch (Exception e) {
            return Response.serverError().build();
        }
    }

    @Override
    @POST
    @Path("/me/carts")
    @Consumes(MediaType.TEXT_PLAIN)
    public Response updateCart(String cartJSON, @Context SecurityContext securityContext) {
        try {
            Principal principal = securityContext.getUserPrincipal();
            Integer userId = Integer.parseInt(principal.getName());
            userDAO.saveCart(userId, cartJSON);
            return Response.noContent().build();
        } catch (NoResultException e) {
            return Response.status(Response.Status.NOT_FOUND).build();
        } catch (Exception e) {
            return Response.serverError().build();
        }
    }

    @Override
    @POST
    @Path("/me/wish-list")
    @Consumes(MediaType.TEXT_PLAIN)
    public Response updateWishlist(String wishListJSON, @Context SecurityContext securityContext) {
        try {
            Principal principal = securityContext.getUserPrincipal();
            Integer userId = Integer.parseInt(principal.getName());
            userDAO.saveWishList(userId, wishListJSON);
            return Response.noContent().build();
        } catch (NoResultException e) {
            return Response.status(Response.Status.NOT_FOUND).build();
        } catch (Exception e) {
            return Response.serverError().build();
        }
    }

    @Override
    @PUT
    @Path("/me")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response updateUser(UserInput userInput, @Context SecurityContext securityContext) {
        try {
            User user = buildUserFromUserInput(userInput, securityContext);
            userDAO.update(user);
            return Response.ok().build();
        } catch (Exception e) {
            return Response.serverError().build();
        }
    }

    private User buildUserFromUserInput(UserInput userInput, @Context SecurityContext securityContext) {
        Principal principal = securityContext.getUserPrincipal();
        String id = principal.getName();
        User user = userDAO.findById(Integer.parseInt(id)).orElseThrow(BadRequestException::new);

        GenderType gender = GenderType.valueOf(userInput.getGender());
        LocalDate birthday = Instant.ofEpochMilli(userInput.getBirthday()).atZone(ZoneId.systemDefault()).toLocalDate();

        if (!user.getEmail().equals(userInput.getEmail())) {
            if (userDAO.checkEmailExisted(userInput.getEmail())) {
                user.setEmail(userInput.getEmail());
            } else {
                throw new BadRequestException();
            }
        }

        user.setName(userInput.getName());
        user.setPhone(userInput.getPhone());
        user.setGender(gender);
        user.setBirthday(birthday);
        return user;
    }

    @Override
    @PUT
    @Path("/me/password")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response updatePassword(PasswordInput passwordInput, @Context SecurityContext securityContext) {
        try {
            Principal principal = securityContext.getUserPrincipal();
            Integer userId = Integer.parseInt(principal.getName());
            String oldPassword = passwordInput.getOldPassword();
            String newPassword = passwordInput.getNewPassword();
            return userDAO.updatePassword(userId, oldPassword, newPassword)
                    ? Response.noContent().build()
                    : Response.status(Response.Status.BAD_REQUEST).build();
        } catch (Exception e) {
            return Response.serverError().build();
        }
    }

    @Override
    @GET
    @Path("/me/addresses")
    @Produces(MediaType.APPLICATION_JSON)
    public Response findUserAddresses(@Context SecurityContext securityContext) {
        try {
            Principal principal = securityContext.getUserPrincipal();
            Integer userId = Integer.parseInt(principal.getName());
            List<Address> addresses = addressDAO.findByUserId(userId);
            return Response.ok(addresses).build();
        } catch (Exception e) {
            return Response.serverError().build();
        }
    }

    @Override
    @GET
    @Path("/me/orders")
    @Produces(MediaType.APPLICATION_JSON)
    public Response findUserOrderOverviews(@QueryParam("page") @DefaultValue("1") Integer page,
                                           @Context SecurityContext securityContext) {
        try {
            Principal principal = securityContext.getUserPrincipal();
            Integer userId = Integer.parseInt(principal.getName());
            List<OrderOverview> orderOverviews = orderDAO.findByUserId(page, userId);
            Long orderCount = orderDAO.findTotalOrdersByUserId(userId);
            return Response.ok(orderOverviews).header("X-Total-Count", orderCount).build();
        } catch (Exception e) {
            return Response.serverError().build();
        }
    }

    @Override
    @GET
    @Path("/me/social-auth")
    @Produces(MediaType.APPLICATION_JSON)
    public Response checkUserSocialMediaAuth(@Context SecurityContext securityContext) {
        try {
            Principal principal = securityContext.getUserPrincipal();
            Integer userId = Integer.parseInt(principal.getName());
            User user = userDAO.findById(userId).orElseThrow(Exception::new);
            Map<SocialMediaType, Boolean> socialMediaAuth = new HashMap<>();
            socialMediaAuth.put(SocialMediaType.FACEBOOK, user.getFacebookId() != null);
            socialMediaAuth.put(SocialMediaType.GOOGLE, user.getGoogleId() != null);
            return Response.ok(socialMediaAuth).build();
        } catch (Exception e) {
            return Response.serverError().build();
        }
    }

    @Override
    @GET
    @Path("/me/rewards")
    @Produces(MediaType.APPLICATION_JSON)
    public Response findUserRewards(@Context SecurityContext securityContext) {
        try {
            Principal principal = securityContext.getUserPrincipal();
            Integer userId = Integer.parseInt(principal.getName());
            List<UserReward> rewards = new LinkedList<>();
            for (RewardType type : RewardType.values()) {
                Reward reward = rewardDAO.findByType(type);
                Long curValue = buildStatisticValue(type, userId);
                RewardLevelType level = buildRewardLevelType(curValue, reward);
                UserReward userReward = UserReward.builder().type(type).level(level).curValue(curValue).reward(reward).build();
                rewards.add(userReward);
            }
            return Response.ok(rewards).build();
        } catch (Exception e) {
            e.printStackTrace();
            return Response.serverError().build();
        }
    }

    private Long buildStatisticValue(RewardType rewardType, Integer userId) {
        switch (rewardType) {
            case ORDER:
                return statisticDAO.countTotalDeliveredOrdersByUserId(userId);
            case MONEY:
                return statisticDAO.getTotalPriceOfDeliveredOrdersByUserId(userId);
            case PROMOTION:
                return statisticDAO.getTotalDiscountOfDeliveredOrdersByUserId(userId);
            case RATING:
                return statisticDAO.countTotalAcceptedRatingsByUserId(userId);
            case QUESTION:
                return statisticDAO.countTotalAcceptedQuestionsByUserId(userId);
            default:
                return null;
        }
    }

    private RewardLevelType buildRewardLevelType(Long curValue, Reward reward) {
        if (curValue >= reward.getGoldValue()) {
            return RewardLevelType.GOLD;
        } else if (curValue >= reward.getSilverValue()) {
            return RewardLevelType.SILVER;
        } else if (curValue >= reward.getBronzeValue()) {
            return RewardLevelType.BRONZE;
        } else {
            return RewardLevelType.NONE;
        }
    }
}