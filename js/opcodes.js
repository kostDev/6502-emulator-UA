// example:
// {
//    name: "opcode_name",
//    t: number,
//    code: opcode,
//    run: (cpu) => {}
// },

const OPCODES = {
    0x00: {
        name: "BRK",
        t: 7,
        code: 0x00,
        run: (cpu) => {
            cpu.breakFlag = true;
            cpu.running = false; // stop cpu emulation
        }
    }, // 
    0x01: "ORA (ZP,X)", //
    0x02: "", //  - illegal
    0x03: "", // slo("(d,x)") // illegal
    0x04: "", // nop("d") // illegal
    0x05: "", // ora("d")
    0x06: "", // asl("d")
    0x07: "", // slo("d") // illegal
    0x08: "", // php_implied()
    0x09: "", // ora("#i")
    0x0A: "", // asl_implied()
    0x0B: "", // anc("#i") // illegal
    0x0C: "", // nop("a") // illegal
    0x0D: "", // ora("a")
    0x0E: "", // asl("a")
    0x0F: "", // slo("a") // illegal
    0x10: "", // bpl("*+d")
    0x11: "", // ora("(d),y")
    0x12: "", // stp_implied() // illegal
    0x13: "", // slo("(d),y") // illegal
    0x14: "", // nop("d,x") // illegal
    0x15: "", // ora("d,x")
    0x16: "", // asl("d,x")
    0x17: "", // slo("d,x") // illegal
    0x18: "", // clc_implied()
    0x19: "", // ora("a,y")
    0x1A: "", // nop_implied() // illegal
    0x1B: "", // slo("a,y") // illegal
    0x1C: "", // nop("a,x") // illegal
    0x1D: "", // ora("a,x")
    0x1E: "", // asl("a,x")
    0x1F: "", // slo("a,x") // illegal
    0x20: "", // jsr("a")
    0x21: "", // and("(d,x)")
    0x22: "", // stp_implied() // illegal
    0x23: "", // rla("(d,x)") // illegal
    0x24: "", // bit("d")
    0x25: "", // and("d")
    0x26: "", // rol("d")
    0x27: "", // rla("d") // illegal
    0x28: "", // plp_implied()
    0x29: "", // and("#i")
    0x2A: "", // rol_implied()
    0x2B: "", // anc("#i") // illegal
    0x2C: "", // bit("a")
    0x2D: "", // and("a")
    0x2E: "", // rol("a")
    0x2F: "", // rla("a") // illegal
    0x30: "", // bmi("*+d")
    0x31: "", // and("(d),y")
    0x32: "", // stp_implied() // illegal
    0x33: "", // rla("(d),y") // illegal
    0x34: "", // nop("d,x") // illegal
    0x35: "", // and("d,x")
    0x36: "", // rol("d,x")
    0x37: "", // rla("d,x") // illegal
    0x38: "", // sec_implied()
    0x39: "", // and("a,y")
    0x3A: "", // nop_implied() // illegal
    0x3B: "", // rla("a,y") // illegal
    0x3C: "", // nop("a,x") // illegal
    0x3D: "", // and("a,x")
    0x3E: "", // rol("a,x")
    0x3F: "", // rla("a,x") // illegal
    0x40: "", // rti_implied()
    0x41: "", // eor("(d,x)")
    0x42: "", // stp_implied() // illegal
    0x43: "", // sre("(d,x)") // illegal
    0x44: "", // nop("d") // illegal
    0x45: "", // eor("d")
    0x46: "", // lsr("d")
    0x47: "", // sre("d") // illegal
    0x48: "", // pha_implied()
    0x49: "", // eor("#i")
    0x4A: "", // lsr_implied()
    0x4B: "", // alr("#i") // illegal
    0x4C: "", // jmp("a")
    0x4D: "", // eor("a")
    0x4E: "", // lsr("a")
    0x4F: "", // sre("a") // illegal
    0x50: "", // bvc("*+d")
    0x51: "", // eor("(d),y")
    0x52: "", // stp_implied() // illegal
    0x53: "", // sre("(d),y") // illegal
    0x54: "", // nop("d,x") // illegal
    0x55: "", // eor("d,x")
    0x56: "", // lsr("d,x")
    0x57: "", // sre("d,x") // illegal
    0x58: "", // cli_implied()
    0x59: "", // eor("a,y")
    0x5A: "", // nop_implied() // illegal
    0x5B: "", // sre("a,y") // illegal
    0x5C: "", // nop("a,x") // illegal
    0x5D: "", // eor("a,x")
    0x5E: "", // lsr("a,x")
    0x5F: "", // sre("a,x") // illegal
    0x60: "", // rts_implied()
    0x61: "", // adc("(d,x)")
    0x62: "", // stp_implied() // illegal
    0x63: "", // rra("(d,x)") // illegal
    0x64: "", // nop("d") // illegal
    0x65: "", // adc("d")
    0x66: "", // ror("d")
    0x67: "", // rra("d") // illegal
    0x68: "", // pla_implied()
    0x69: {
        name: "ADC #immediate", // Add with Carry
        t: 2,
        code: 0x69,
        run: (cpu) => {
            const value = cpu.fetch();
            const carry = +cpu.carryFlag// Get the current carry flag
            // Perform the addition with carry
            const result = cpu.ACC + value + carry;
            const overflow = (~(cpu.ACC ^ value) & (cpu.ACC ^ result)) & 0x80;
            
            // Store the result in the accumulator, considering only the lower 8 bits
            cpu.ACC = result & 0xFF;
            
            cpu.carryFlag = result > 0xFF;
            cpu.overflowFlag = overflow;
            cpu.negativeFlag = cpu.ACC;
            cpu.zeroFlag = cpu.ACC;
            
        }
    },
    0x6A: "", // ror_implied()
    0x6B: "", // arr("#i") // illegal
    0x6C: "", // jmp("(a)")
    0x6D: "", // adc("a")
    0x6E: "", // ror("a")
    0x6F: "", // rra("a") // illegal
    0x70: "", // bvs("*+d")
    0x71: "", // adc("(d),y")
    0x72: "", // stp_implied() // illegal
    0x73: "", // rra("(d),y") // illegal
    0x74: "", // nop("d,x") // illegal
    0x75: "", // adc("d,x")
    0x76: "", // ror("d,x")
    0x77: "", // rra("d,x") // illegal
    0x78: "", // sei_implied()
    0x79: "", // adc("a,y")
    0x7A: "", // nop_implied() // illegal
    0x7B: "", // rra("a,y") // illegal
    0x7C: "", // nop("a,x") // illegal
    0x7D: "", // adc("a,x")
    0x7E: "", // ror("a,x")
    0x7F: "", // rra("a,x") // illegal
    0x80: "", // nop("#i") // illegal
    0x81: "", // sta("(d,x)")
    0x82: "", // nop("#i") // illegal
    0x83: "", // sax("(d,x)") // illegal
    0x84: "", // sty("d")
    0x85: "", // sta("d")
    0x86: "", // stx("d")
    0x87: "", // sax("d") // illegal
    0x88: "", // dey_implied()
    0x89: "", // nop("#i") // illegal
    0x8A: {
        name: "TXA", // Transfer Index X to Accumulator
        t: 2,
        code: 0x8A,
        run: (cpu) => {
            cpu.ACC = cpu.X; // Transfer the value from register X to the accumulator
            cpu.negativeFlag = cpu.ACC;
            cpu.zeroFlag = cpu.ACC;
        }
    },
    0x8B: "", // xaa("#i") // illegal
    0x8C: "", // sty("a")
    0x8D: "", // sta("a")
    0x8E: "", // stx("a")
    0x8F: "", // sax("a") // illegal
    0x90: "", // bcc("*+d")
    0x91: "", // sta("(d),y")
    0x92: "", // stp_implied() // illegal
    0x93: "", // ahx("(d),y") // illegal
    0x94: "", // sty("d,x")
    0x95: "", // sta("d,x")
    0x96: "", // stx("d,y")
    0x97: "", // sax("d,y") // illegal
    0x98: {
        name: "TYA", // transfer Y to accumulator
        t: 2,
        code: 0x98,
        run: (cpu) => {
            cpu.ACC = cpu.Y; // Transfer the value from register Y to the accumulator
            cpu.negativeFlag = cpu.ACC;
            cpu.zeroFlag = cpu.ACC;
        }
    },
    0x99: "", // sta("a,y")
    0x9A: "", // txs_implied()
    0x9B: "", // tas("a,y") // illegal
    0x9C: "", // shy("a,x") // illegal
    0x9D: "", // sta("a,x")
    0x9E: "", // shx("a,y") // illegal
    0x9F: "", // ahx("a,y") // illegal
    0xA0: {
        name: "LDY #immediate", // Load Index Y with Memory
        t: 2,
        code: 0xA0,
        run: (cpu) => {
            cpu.Y = cpu.fetch(); // get next byte as value
            cpu.negativeFlag = cpu.Y;
            cpu.zeroFlag = cpu.Y;
        }
    },
    0xA1: "",
    0xA2: {
        name: "LDX #immediate", // Load Index X with Memory
        t: 2,
        code: 0xA2,
        run: (cpu) => {
            cpu.X = cpu.fetch(); // get next byte as value
            cpu.negativeFlag = cpu.X;
            cpu.zeroFlag = cpu.X;
        }
    }, 
    0xA3: "", // lax("(d,x)") // illegal
    0xA4: "",
    0xA5: "",
    0xA6: "",
    0xA7: "", // illegal
    0xA8: {
        name: "TAY", // Transfer Accumulator to Index Y
        t: 2,
        code: 0xA8,
        run: (cpu) => {
            cpu.Y = cpu.ACC;  // Transfer the value from register ACC to the Y
            cpu.negativeFlag = cpu.Y;
            cpu.zeroFlag = cpu.Y;
        }
    },
    0xA9: {
        name: "LDA #immediate", // Load Accumulator with Memory
        t: 2,
        code: 0xA9,
        run: (cpu) => {
            cpu.ACC = cpu.fetch(); // get next byte as value
            cpu.negativeFlag = cpu.ACC;
            cpu.zeroFlag = cpu.ACC;
        }
    },
    0xAA: {
        name: "TAX", // Transfer Accumulator to Index X
        t: 2,
        code: 0xAA,
        run: (cpu) => {
            cpu.X = cpu.ACC // get next byte as value
            cpu.negativeFlag = cpu.X;
            cpu.zeroFlag = cpu.X;
        }
    },
    0xAB: "", // lax("#i") // illegal
    0xAC: "",
    0xAD: "",
    0xAE: "",
    0xAF: "", // lax("a") // illegal
    0xB0: "", // bcs("*+d")
    0xB1: "", // lda("(d),y")
    0xB2: "", // stp_implied() // illegal
    0xB3: "", // lax("(d),y") // illegal
    0xB4: "",
    0xB5: "",
    0xB6: "",
    0xB7: "", // lax("d,y") // illegal
    0xB8: "", // clv_implied()
    0xB9: "", // lda("a,y")
    0xBA: "", // tsx_implied()
    0xBB: "", // las("a,y") // illegal
    0xBC: "", // ldy("a,x")
    0xBD: "", // lda("a,x")
    0xBE: "", // ldx("a,y")
    0xBF: "", // lax("a,y") // illegal
    0xC0: "", // cpy("#i")
    0xC1: "", // cmp("(d,x)")
    0xC2: "", // nop("#i") // illegal
    0xC3: "", // dcp("(d,x)") // illegal
    0xC4: "", // cpy("d")
    0xC5: "", // cmp("d")
    0xC6: "", // dec("d")
    0xC7: "", // dcp("d") // illegal
    0xC8: "", // iny_implied()
    0xC9: "", // cmp("#i")
    0xCA: "", // dex_implied()
    0xCB: "", // axs("#i") // illegal
    0xCC: "",
    0xCD: "",
    0xCE: "",
    0xCF: "", // dcp("a") // illegal
    0xD0: "",
    0xD1: "",
    0xD2: "", // stp_implied() // illegal
    0xD3: "", // dcp("(d),y") // illegal
    0xD4: "", // nop("d,x") // illegal
    0xD5: "",
    0xD6: "",
    0xD7: "", // dcp("d,x") // illegal
    0xD8: "", // cld_implied()
    0xD9: "",
    0xDA: "", // nop_implied() // illegal
    0xDB: "", // dcp("a,y") // illegal
    0xDC: "", // nop("a,x") // illegal
    0xDD: "",
    0xDE: "",
    0xDF: "", // dcp("a,x") // illegal
    0xE0: "",
    0xE1: "",
    0xE2: "", // nop("#i") // illegal
    0xE3: "", // isc("(d,x)") // illegal
    0xE4: "",
    0xE5: "",
    0xE6: "",
    0xE7: "", // isc("d") // illegal
    0xE8: "",
    0xE9: {
        name: "SBC #immediate", // Subtract Memory from Accumulator with Borrow
        t: 2,
        code: 0xE9,
        run: (cpu) => {
            const value = cpu.fetch();
            const carry = cpu.carryFlag ? 0 : 1; // Get the current carry flag (inverted for borrow)
            // Perform the subtraction with borrow
            const result = cpu.ACC - value - carry;
            const overflow = ((cpu.ACC ^ result) & (~cpu.ACC ^ value)) & 0x80;
            
            cpu.ACC = result & 0xFF;

            cpu.negativeFlag = cpu.ACC;
            cpu.overflowFlag = overflow;
            cpu.zeroFlag = cpu.ACC;
            cpu.carryFlag = result >= 0;
        }
    },
    0xEA: {
        name: "NOP", // No Operation
        t: 2,
        code: 0xEA,
        run: null
    },
    0xEB: "", // sbc("#i") // illegal
    0xEC: "",
    0xED: "",
    0xEE: "",
    0xEF: "", // isc("a") // illegal
    0xF0: "",
    0xF1: "",
    0xF2: "", // stp_implied() // illegal
    0xF3: "", // isc("(d),y") // illegal
    0xF4: "", // nop("d,x") // illegal
    0xF5: "",
    0xF6: "",
    0xF7: "", // isc("d,x") illegal
    0xF8: "",
    0xF9: "",
    0xFA: "", // nop_implied() // illegal
    0xFB: "", // isc("a,y") // illegal
    0xFC: "", // nop("a,x") // illegal
    0xFD: "",
    0xFE: "",
    0xFF: "" // isc("a,x") // illegal
};

export default OPCODES;