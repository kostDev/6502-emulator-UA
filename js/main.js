import Memory from "./memory";
import CPU from "./cpu";

const params = {
    testing: false,
    running: false
}
const cpu = new CPU(new Memory(0x10000), params);

cpu.run();