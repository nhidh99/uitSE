package org.example.dao.impl;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.example.dao.api.UserDAO;
import org.example.model.User;
import org.mindrot.jbcrypt.BCrypt;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.swing.text.html.Option;
import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Transactional
@NoArgsConstructor
@AllArgsConstructor
public class UserDAOImpl implements UserDAO {

    @PersistenceContext(unitName = "laptop-store")
    private EntityManager em;

    private static final int WORKLOAD = 12;

    private String hashPassword(String plainPassword) {
        String salt = BCrypt.gensalt(WORKLOAD);
        return BCrypt.hashpw(plainPassword, salt);
    }

    @Override
    @Transactional(Transactional.TxType.REQUIRES_NEW)
    public boolean login(String username, String plainPassword) {
        Optional<User> optUser = findByUsername(username);
        if (optUser.isPresent()) {
            String hashedPassword = optUser.get().getPassword();
            return BCrypt.checkpw(plainPassword, hashedPassword);
        }
        return false;
    }

    @Override
    @Transactional(Transactional.TxType.REQUIRES_NEW)
    public void register(User user) {
        String hashedPassword = hashPassword(user.getPassword());
        user.setPassword(hashedPassword);
        em.persist(user);
    }

    @Override
    @Transactional(Transactional.TxType.REQUIRES_NEW)
    public void update(User user) {
        em.merge(user);
    }

    @Override
    @Transactional(Transactional.TxType.SUPPORTS)
    public Optional<User> findByUsername(String username) {
        String query = "SELECT u FROM User u WHERE u.username = :username";
        List<User> users = em.createQuery(query, User.class)
                .setParameter("username", username)
                .setMaxResults(1).getResultList();
        return users.isEmpty() ? Optional.empty() : Optional.of(users.get(0));
    }

    @Override
    public Optional<User> findByFacebookId(String facebookId) {
        String query = "SELECT u FROM User u WHERE u.facebookId = :facebookId";
        List<User> users = em.createQuery(query, User.class)
                .setParameter("facebookId", facebookId)
                .setMaxResults(1).getResultList();
        return users.isEmpty() ? Optional.empty() : Optional.of(users.get(0));
    }

    @Override
    public Optional<User> findByGoogleId(String googleId) {
        String query = "SELECT u FROM User u WHERE u.googleId = :googleId";
        List<User> users = em.createQuery(query, User.class)
                .setParameter("googleId", googleId)
                .setMaxResults(1).getResultList();
        return users.isEmpty() ? Optional.empty() : Optional.of(users.get(0));
    }

    @Override
    @Transactional(Transactional.TxType.SUPPORTS)
    public Optional<User> findById(Integer id) {
        User user = em.find(User.class, id);
        return Optional.of(user);
    }

    @Override
    @Transactional(Transactional.TxType.SUPPORTS)
    public boolean checkRegister(String username, String email) {
        String query = "SELECT u FROM User u WHERE u.email = :email OR u.username = :username";
        List<User> users = em.createQuery(query, User.class)
                .setParameter("email", email)
                .setParameter("username", username)
                .setMaxResults(1).getResultList();
        return users.isEmpty();
    }

    @Override
    @Transactional(Transactional.TxType.SUPPORTS)
    public boolean checkEmailExisted(String email) {
        String query = "SELECT u FROM User u WHERE u.email = :email";
        List<User> users = em.createQuery(query, User.class)
                .setParameter("email", email)
                .setMaxResults(1).getResultList();
        return users.isEmpty();
    }

    @Override
    @Transactional(Transactional.TxType.REQUIRES_NEW)
    public void saveCart(Integer userId, String cartJSON) {
        User user = em.find(User.class, userId);
        if (user == null) throw new NoResultException();
        user.setCart(cartJSON);
        em.merge(user);
    }

    @Override
    @Transactional(Transactional.TxType.REQUIRES_NEW)
    public void saveWishList(Integer userId, String wishListJSON) {
        User user = em.find(User.class, userId);
        if (user == null) throw new NoResultException();
        user.setWishList(wishListJSON);
        em.merge(user);
    }

    @Override
    @Transactional(Transactional.TxType.REQUIRES_NEW)
    public boolean updatePassword(Integer userId, String oldPassword, String newPassword) {
        User user = em.find(User.class, userId);
        boolean isValidCredential = user != null && BCrypt.checkpw(oldPassword, user.getPassword());
        if (isValidCredential) {
            String newHashedPassword = hashPassword(newPassword);
            user.setPassword(newHashedPassword);
            em.merge(user);
            return true;
        }
        return false;
    }
}