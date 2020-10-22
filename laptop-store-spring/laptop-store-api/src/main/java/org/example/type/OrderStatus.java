package org.example.type;

public enum OrderStatus {
    PENDING,
    RECEIVED,
    PACKAGED,
    DELIVERING,
    DELIVERED,
    CANCELED;

    public boolean isBeforePackaged() {
        return this.equals(PENDING) || this.equals(RECEIVED);
    }

    public boolean isPackaged() {
        switch (this) {
            case PACKAGED:
            case DELIVERED:
            case DELIVERING:
                return true;
            default:
                return false;
        }
    }

    public boolean isCanceled() {
        return this.equals(CANCELED);
    }

    public int getProgressStep() {
        switch (this) {
            case PENDING:
                return 0;
            case RECEIVED:
                return 1;
            case PACKAGED:
                return 2;
            case DELIVERING:
                return 3;
            case DELIVERED:
                return 4;
            case CANCELED:
                return -1;
            default:
                return -2;
        }
    }
}