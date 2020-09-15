import BatteryModel from "./BatteryModel";
import CpuModel from "./CpuModel";
import HardDriveModel from "./HardDriveModel";
import MonitorModel from "./MonitorModel";
import RamModel from "./RamModel";

type ProductSpecModel = {
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
    cpu: CpuModel;
    ram: RamModel;
    hard_drive: HardDriveModel;
    monitor: MonitorModel;
    battery: BatteryModel;
};

export default ProductSpecModel;