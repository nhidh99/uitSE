type PromotionType = {
    id: number;
    name: string;
    price: number;
    quantity: number;
    alt: string;
};

type CPUType = {
    id: number;
    type: string;
    detail: string;
    speed: number;
    max_speed: number;
};

type RAMType = {
    id: number;
    size: number;
    type: string;
    bus: number;
    max_size: number;
    detail: string;
};

type HardDriveType = {
    id: number;
    type: string;
    size: number;
    detail: string;
};

type MonitorType = {
    id: number;
    size: number;
    resolution_type: string;
    resolution_width: number;
    resolution_height: number;
    technology: string;
    card_design: string;
    graphics_card: string;
};

type BatteryType = {
    id: number;
    type: string;
    detail: string;
    adapter: string;
};

type ReplyType = {
    id: number;
    user: string;
    reply: string;
    reply_date: Date;
};

type CommentType = {
    id: number;
    user: string;
    question: string;
    comment_date: Date;
    replies: Array<ReplyType>;
};

type RatingType = {
    id: number;
    user: string;
    rating: number;
    comment_title: string | null;
    comment_detail: string | null;
    rating_date: Date;
    replies: Array<ReplyType>;
};

export type ProductSummaryType = {
    name: string;
    id: number;
    unit_price: number;
    alt: string;
    discount_price: number;
    avg_rating: number;
    ram: {
        size: number;
    };
    hard_drive: {
        type: string;
        size: number;
    };
};

export type ProductDetailType = {
    promotions: Array<PromotionType>;
    suggestions: Array<ProductSummaryType>;
    image_ids: Array<number>;
    comments: Array<CommentType>;
    ratings: Array<RatingType>;
    details: {
        specials: string | null;
        id: number;
        name: string;
        brand: string;
        unit_price: number;
        discount_price: number;
        quantity: number;
        alt: string;
        avg_rating: number;
        ports: string;
        sound_tech: string;
        wireless: string;
        sd_cards: string | null;
        webcam: string | null;
        os: string;
        design: string;
        size: string;
        weight: number;
        cpu: CPUType;
        ram: RAMType;
        hard_drive: HardDriveType;
        monitor: MonitorType;
        battery: BatteryType;
    };
};
