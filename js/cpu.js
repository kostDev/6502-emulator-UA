import OPCODES from "./opcodes";

class CPU {
    constructor(memory, { testing = false, running = false }) {
        this.testing = testing;
        this.running = running;
        
        this.memory = memory;
        this.cycles = 0;
        this._registers = {
            PC: 0x0600, //(16bit) Program Counter, 0x0600 start address 
            SP: 0xFF,  // (8bit)  Stack Pointer
            ACC: 0x00, // (8bit)  Accumulator
            X: 0x00,  //  (8bit)
            Y: 0x00, //   (8bit)
            FLAG_STATUS: 0x00, // (8bit) default FLAGS value 0x00 -> 0b00000000
        }
        /* FLAG_STATUS -> N V - B D I Z C -> 0b00000000 -> 0x00
            7(bit) 0x80  N  Negative
            6(bit) 0x40  V  Overflow
            5(bit) 0x20  -  (Expansion)
            4(bit) 0x10  B  Break Command
            3(bit) 0x08  D  Decimal
            2(bit) 0x04  I  Interrupt Disable
            1(bit) 0x02  Z  Zero
            0(bit) 0x01  C  Carry
        * */
        
        !this.testing && console.log('run emulator for CPU 6502!');
    }
    
    // Registers ------------ 8bit max 0xFF and 16bit max 0xFFFF
    get PC() {
        return this._registers.PC;
    }
    
    set PC(value) {
        this._registers.PC = value & 0xFFFF;
    }
    
    get SP() {
        return this._registers.SP;
    }

    set SP(value) {
        this._registers.SP = value & 0xFF;
    }
    
    get ACC() {
        return this._registers.ACC;
    }

    set ACC(value) {
        this._registers.ACC = value & 0xFF;
    }

    get X() {
        return this._registers.X;
    }

    set X(value) {
        this._registers.X = value & 0xFF;
    }

    get Y() {
        return this._registers.Y;
    }

    set Y(value) {
        this._registers.Y = value & 0xFF;
    }
    get flagStatus() {
        return this._registers.FLAG_STATUS;
    }
    // FLAGS --------------
    // Getter for Negative flag (N)
    get negativeFlag() {
        return (this._registers.FLAG_STATUS & 0x80) !== 0;
    }

    set negativeFlag(value) {
        if(value & 0x80) this._registers.FLAG_STATUS |= 0x80;
        else this._registers.FLAG_STATUS &= ~0x80; // reset N flag
    }

    // Getter for Overflow flag (V)
    get overflowFlag() {
        return (this._registers.FLAG_STATUS & 0x40) !== 0;
    }

    set overflowFlag(condition) {
        if(condition) this._registers.FLAG_STATUS |= 0x40;
        else this._registers.FLAG_STATUS &= ~0x40; // reset V flag
    }

    // Getter for Break flag (B)
    get breakFlag() {
        return (this._registers.FLAG_STATUS & 0x10) !== 0;
    }

    set breakFlag(isBreak) {
        if (isBreak) this._registers.FLAG_STATUS |= 0x10;
        else this._registers.FLAG_STATUS &= ~0x10; // reset B flag
    }

    // Getter for Decimal mode flag (D)
    get decimalFlag() {
        return (this._registers.FLAG_STATUS & 0x08) !== 0;
    }

    set decimalFlag(isDecimal) {
        if (isDecimal) this._registers.FLAG_STATUS |= 0x08;
        else this._registers.FLAG_STATUS &= ~0x08; // reset D flag
    }

    // Getter for Interrupt Disable flag (I)
    get interruptDisableFlag() {
        return (this._registers.FLAG_STATUS & 0x04) !== 0;
    }

    set interruptDisableFlag(disable) {
        if (disable) this._registers.FLAG_STATUS |= 0x04;
        else this._registers.FLAG_STATUS &= ~0x04; // reset I flag
    }

    // Getter for Zero flag (Z)
    get zeroFlag() {
        return (this._registers.FLAG_STATUS & 0x02) !== 0;
    }

    set zeroFlag(value) {
        if (value === 0) this._registers.FLAG_STATUS |= 0x02;
        else this._registers.FLAG_STATUS &= ~0x02; // reset Z flag
    }

    // Getter for Carry flag (C)
    get carryFlag() {
        return (this._registers.FLAG_STATUS & 0x01) !== 0;
    }

    set carryFlag(carry) {
        if (carry) this._registers.FLAG_STATUS |= 0x01;
        else this._registers.FLAG_STATUS &= ~0x01; // reset C flag
    }
    // ------------------
    
    // STACK ------------
    stackPush(value) {
        // Stack in cpu 6502 exist in memory from address 0x0100 to 0x01FF
        this.memory.writeByte(0x0100 + this._registers.SP, value & 0xFF);
        this.SP -= 1; // in setter compare with 0xFF
    }
    stackPop() {
        this.SP += 1;
        return this.memory.readByte(0x0100 + this._registers.SP);
    }
    // ------------------

    fetch() {
        const opcode = this.memory.readByte(this.PC);
        this.PC += 1; // Shift PC to the next byte
        return opcode;
    }

    decode(opcode) {
        const instruction = OPCODES[opcode];
        if (instruction) {
            this.cycles += instruction.t; // for future console emulation processes
            instruction.run && instruction.run(this);
        } else throw new Error(`Unknown opcode: 0x${opcode.toString(16).toUpperCase()}`);
    }

    // execute instructions or operation codes
    exec() {
        const opcode = this.fetch();
        this.decode(opcode);
    }

    run() {
        while (this.running) {
            this.exec();
        }
    }
}

export default CPU;
