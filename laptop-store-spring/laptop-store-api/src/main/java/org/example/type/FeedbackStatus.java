package org.example.type;

import java.util.NoSuchElementException;

public enum FeedbackStatus {
    PENDING,
    APPROVED,
    REJECTED;

    public Boolean getApproveStatus() {
        switch (this) {
            case APPROVED:
                return true;
            case REJECTED:
                return false;
            case PENDING:
                return null;
            default:
                throw new NoSuchElementException();
        }
    }
}