package org.example.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.type.ReplyType;
import org.example.type.RoleType;

import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "reply")
public class Reply {
    private static final String LAPTOP_STORE = "Laptop Store";

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "parent_id")
    private Integer parentId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "detail")
    private String detail;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "reply_type")
    @Enumerated(EnumType.STRING)
    private ReplyType replyType;

    @Column(name = "approve_status")
    private Boolean approveStatus;

    public String getAuthorName() {
        return RoleType.ADMIN.equals(user.getRole()) ? LAPTOP_STORE : user.getName();
    }

    public boolean isAdminReply() {
        return RoleType.ADMIN.equals(user.getRole());
    }
}