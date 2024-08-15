class Memory {
    constructor(size = 0x10000) { // 64 КБ
        this.memory = new Uint8Array(size); // 8bit memory
    }
    
    // write in memory 8bit value (1byte) 
    writeByte(address, value) {
        this.memory[address] = value & 0xFF; // write only 8bit value
    }
    
    readByte(address) {
        return this.memory[address]; // read only 8bit value only
    }
    
    // write in memory 16bit value (2byte) 
    writeWord(address, value) {
        // divide 16bit value on 2parts in two memory 8bit cells as result store 16bit value in two 8bit memory addresses
        this.memory[address] = value & 0xFF; // low byte
        this.memory[address+1] =  (value >> 8) & 0xFF; // high byte
    }
    
    readWord(address) {
        // use or operator for unite in 16bit value
        return this.memory[address] | (this.memory[address+1] << 8);
    }
}

export default Memory;