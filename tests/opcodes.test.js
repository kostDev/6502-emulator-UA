import {describe, expect, test, beforeEach, jest} from "@jest/globals";

import Memory from "../js/memory";
import CPU from "../js/cpu";
import OPCODES from "../js/opcodes";


describe("OPCODES:", () => {
    let memory, cpu, params;

    beforeEach(() => {
        params = {testing: true, running: true};
        memory = new Memory();
        cpu = new CPU(memory, params);
    });
    
    describe("0x00 -> BRK", () => {
        test("decode", () => {
            const instruction = OPCODES[0x00];
            cpu.decode(instruction.code);
            
            expect(instruction.code).toBe(0x00);
            expect(cpu.breakFlag).toBe(true);
            expect(cpu.running).toBe(false);
        });
    });

    describe("0x09 -> ORA #immediate", () => {
        test("decode", () => {
            const instruction = OPCODES[0x09];
            cpu.ACC = 0x10;
            cpu.decode(instruction.code);

            expect(instruction.code).toBe(0x09);
            expect(cpu.ACC).toBe(0x10); // test only on empty memory
            expect(cpu.negativeFlag).toBe(false);
            expect(cpu.zeroFlag).toBe(false);
        });
    });

    describe("0x29 -> AND #immediate", () => {
        test("decode", () => {
            const instruction = OPCODES[0x29];
            cpu.ACC = 0x05;
            cpu.decode(instruction.code);

            expect(instruction.code).toBe(0x29);
            expect(cpu.ACC).toBe(0x00); // test only on empty memory
            expect(cpu.negativeFlag).toBe(false);
            expect(cpu.zeroFlag).toBe(true);
        });
    });

    describe("0x49 -> EOR #immediate", () => {
        test("decode", () => {
            const instruction = OPCODES[0x49];
            cpu.ACC = 0xAA;
            cpu.decode(instruction.code);

            expect(instruction.code).toBe(0x49);
            expect(cpu.ACC).toBe(0xAA); // XOR but test only on empty memory
            expect(cpu.negativeFlag).toBe(true); // 0xAA = 10101010
            expect(cpu.zeroFlag).toBe(false);
        });
    });

    describe("0x69 -> TYA", () => {
        test("decode", () => {
            const instruction = OPCODES[0x69];
            cpu.ACC = 0x30; // 48
            cpu.decode(instruction.code);
            
            expect(instruction.code).toBe(0x69);
            expect(cpu.ACC).toBe(0x30);
            expect(cpu.negativeFlag).toBe(false);
            expect(cpu.overflowFlag).toBe(false);
            expect(cpu.zeroFlag).toBe(false);
            expect(cpu.carryFlag).toBe(false);
        });
    });

    describe("0x84 -> STY zeropage", () => {
        test("decode", () => {
            const instruction = OPCODES[0x84];
            cpu.Y = 0x05;
            cpu.decode(instruction.code);

            const memoryAddress = cpu.memory.readByte(cpu.PC-1);
            const memoryValue = cpu.memory.readByte(memoryAddress);

            expect(instruction.code).toBe(0x84);
            expect(memoryValue).toBe(cpu.Y); // check store Y value in memory
            expect(cpu.negativeFlag).toBe(false);
            expect(cpu.zeroFlag).toBe(false);
        });
    });

    describe("0x85 -> STA zeropage", () => {
        test("decode", () => {
            const instruction = OPCODES[0x85];
            cpu.ACC = 0x85;
            cpu.decode(instruction.code);

            const memoryAddress = cpu.memory.readByte(cpu.PC-1);
            const memoryValue = cpu.memory.readByte(memoryAddress);

            expect(instruction.code).toBe(0x85);
            expect(memoryValue).toBe(cpu.ACC); // check store value in memory
            expect(cpu.negativeFlag).toBe(false);
            expect(cpu.zeroFlag).toBe(false);
        });
    });

    describe("0x86 -> STX zeropage", () => {
        test("decode", () => {
            const instruction = OPCODES[0x86];
            cpu.X = 0xA1;
            cpu.decode(instruction.code);

            const memoryAddress = cpu.memory.readByte(cpu.PC-1);
            const memoryValue = cpu.memory.readByte(memoryAddress);

            expect(instruction.code).toBe(0x86);
            expect(memoryValue).toBe(cpu.X); // check store X value in memory
            expect(cpu.negativeFlag).toBe(false);
            expect(cpu.zeroFlag).toBe(false);
        });
    });

    describe("0x88 -> DEY", () => {
        test("decode", () => {
            const instruction = OPCODES[0x88];
            cpu.Y = 0x0F; // 15
            cpu.decode(instruction.code);

            expect(instruction.code).toBe(0x88);
            expect(cpu.Y).toBe(0x0E); // 14
            expect(cpu.negativeFlag).toBe(false);
            expect(cpu.zeroFlag).toBe(false);

            cpu.Y = 0;
            cpu.decode(instruction.code);

            expect(cpu.Y).toBe(0xFF); // 8bit value max
            expect(cpu.negativeFlag).toBe(true);
            expect(cpu.zeroFlag).toBe(false)

            cpu.Y = 0x01;
            cpu.decode(instruction.code);

            expect(cpu.Y).toBe(0x00);
            expect(cpu.negativeFlag).toBe(false);
            expect(cpu.zeroFlag).toBe(true);
        });
    });
    
    describe("0x8A -> TXA", () => {
        test("decode", () => {
            const instruction = OPCODES[0x8A];
            cpu.X = 0x24; // 36
            cpu.decode(instruction.code);
            
            expect(instruction.code).toBe(0x8A);
            expect(cpu.ACC).toBe(cpu.X);
            expect(cpu.negativeFlag).toBe(false);
            expect(cpu.zeroFlag).toBe(false);
        });
    });

    describe("0x90 -> BCC", () => {
        beforeEach(() => {
            cpu.memory.writeByte = jest.fn(); // Mock writeByte if needed
        });

        test("decode and execute with Carry Clear (Branch Taken)", () => {
            const instruction = OPCODES[0x90];

            cpu.carryFlag = false; // Ensure Carry flag is clear (C = 0)
            cpu.PC = 0x1000; // Set an initial value for the program counter
            cpu.memory.readByte = jest.fn(() => 0x02); // Mock fetch to return a positive offset

            cpu.decode(instruction.code);

            expect(instruction.code).toBe(0x90);
            expect(cpu.PC).toBe(0x1002 + 0x01); // Expect the PC to be updated correctly
            expect(cpu.cycles).toBe(3); // Base cycles (2) + 1 additional cycle for taken branch
        });
        test("decode and execute with Carry Set (No Branch)", () => {
            const instruction = OPCODES[0x90];

            cpu.carryFlag = true; // Set Carry flag (C = 1)
            cpu.PC = 0x1000; // Set an initial value for the program counter
            cpu.memory.readByte = jest.fn(() => 0x02); // Mock fetch to return a positive offset

            cpu.decode(instruction.code);

            expect(instruction.code).toBe(0x90);
            expect(cpu.PC).toBe(0x1001); // Expect the PC to increment by 1 (no branch taken)
            expect(cpu.cycles).toBe(2); // Only base cycles (2) are used
        });
        test("decode and execute with Carry Clear (Branch Crosses Page)", () => {
            const instruction = OPCODES[0x90];

            cpu.carryFlag = false; // Ensure Carry flag is clear (C = 0)
            cpu.PC = 0x10FF; // Set the program counter near a page boundary
            cpu.memory.readByte = jest.fn(() => 0x01); // Mock fetch to return an offset that crosses the page

            cpu.decode(instruction.code);

            expect(instruction.code).toBe(0x90);
            expect(cpu.PC).toBe(0x1101); // Expect the PC to cross the page boundary
            expect(cpu.cycles).toBe(3); // Base cycles (2) + 1 for taken branch + 1 for page cross
        });
    });
    
    describe("0x98 -> TYA", () => {
        test("decode", () => {
            const instruction = OPCODES[0x98];
            cpu.Y = 0x24; // 36
            cpu.decode(instruction.code);
            
            expect(instruction.code).toBe(0x98);
            expect(cpu.ACC).toBe(cpu.Y);
            expect(cpu.negativeFlag).toBe(false);
            expect(cpu.zeroFlag).toBe(false);
        });
    });
    
    describe("0xA0 -> LDY #immediate", () => {
        test("decode", () => {
            const instruction = OPCODES[0xA0];
            cpu.decode(instruction.code);
            
            expect(instruction.code).toBe(0xA0);
            expect(cpu.Y).toBe(0x00);
            expect(cpu.negativeFlag).toBe(false);
            expect(cpu.zeroFlag).toBe(true);
        });
    });
    
    describe("0xA2 -> LDX #immediate", () => {
        test("decode", () => {
            const instruction = OPCODES[0xA2];
            cpu.decode(instruction.code);
            
            expect(instruction.code).toBe(0xA2);
            expect(cpu.X).toBe(0x00);
            expect(cpu.negativeFlag).toBe(false);
            expect(cpu.zeroFlag).toBe(true);
        });
    });

    describe("0xA5 -> LDA zeropage", () => {
        beforeEach(() => {
            cpu.memory.readByte = jest.fn()
        });

        test("should load the correct value into the accumulator and update flags", () => {
            const instruction = OPCODES[0xA5];

            cpu.memory.readByte.mockReturnValue(0x80);
            cpu.fetch = jest.fn(() => 0x42);

            cpu.decode(instruction.code);

            expect(instruction.code).toBe(0xA5);
            expect(cpu.ACC).toBe(0x80);
            expect(cpu.negativeFlag).toBe(true);
            expect(cpu.zeroFlag).toBe(false);
        });

        test("should update zero flag correctly when loaded value is 0x00", () => {
            const instruction = OPCODES[0xA5];

            cpu.memory.readByte.mockReturnValue(0x00);
            cpu.fetch = jest.fn(() => 0x42);
            cpu.decode(instruction.code);

            expect(instruction.code).toBe(0xA5);
            expect(cpu.ACC).toBe(0x00);
            expect(cpu.negativeFlag).toBe(false);
            expect(cpu.zeroFlag).toBe(true);
        });
    });
    
    describe("0xA8 -> TAY", () => {
        test("decode", () => {
            const instruction = OPCODES[0xA8];
            cpu.ACC = 0x42; // 66
            cpu.decode(instruction.code);
            
            expect(instruction.code).toBe(0xA8);
            expect(cpu.Y).toBe(cpu.ACC);
            expect(cpu.negativeFlag).toBe(false);
            expect(cpu.zeroFlag).toBe(false);
        });
    });
    
    describe("0xA9 -> LDA #immediate", () => {
        test("decode", () => {
            const instruction = OPCODES[0xA9];
            cpu.decode(instruction.code);
            
            expect(instruction.code).toBe(0xA9);
            expect(cpu.ACC).toBe(0x00);
            expect(cpu.negativeFlag).toBe(false);
            expect(cpu.zeroFlag).toBe(true);
        });
    });
    
    describe("0xAA -> TAX", () => {
        test("decode", () => {
            const instruction = OPCODES[0xAA];
            cpu.ACC = 0x42; // 66
            cpu.decode(instruction.code);
            
            expect(instruction.code).toBe(0xAA);
            expect(cpu.X).toBe(cpu.ACC);
            expect(cpu.negativeFlag).toBe(false);
            expect(cpu.zeroFlag).toBe(false);
        });
    });

    describe("0xAD -> LDA absolute", () => {
        beforeEach(() => {
            cpu.memory.readByte = jest.fn()
        });

        test("should load the correct value into the accumulator from the absolute address and update flags", () => {
            const instruction = OPCODES[0xAD];
            // 16bit address 0x1234 and value 0x80
            const lowByte = 0x34;
            const highByte = 0x12;
            const address = 0x1234;
            cpu.memory.readByte.mockReturnValue(0x80);

            cpu.fetch = jest.fn()
                .mockReturnValueOnce(lowByte)
                .mockReturnValueOnce(highByte);

            cpu.decode(instruction.code);

            expect(instruction.code).toBe(0xAD);
            expect(cpu.memory.readByte).toHaveBeenCalledWith(address);
            expect(cpu.ACC).toBe(0x80);
            expect(cpu.negativeFlag).toBe(true);
            expect(cpu.zeroFlag).toBe(false);
        });

        test("should correctly update zero flag when loaded value is 0x00", () => {
            const instruction = OPCODES[0xAD];

            const lowByte = 0x34;
            const highByte = 0x12;
            const address = 0x1234;
            cpu.memory.readByte.mockReturnValue(0x00);

            cpu.fetch = jest.fn()
                .mockReturnValueOnce(lowByte)
                .mockReturnValueOnce(highByte);

            cpu.decode(instruction.code);

            expect(instruction.code).toBe(0xAD);
            expect(cpu.memory.readByte).toHaveBeenCalledWith(address);
            expect(cpu.ACC).toBe(0x00);
            expect(cpu.negativeFlag).toBe(false);
            expect(cpu.zeroFlag).toBe(true);
        });
    });

    describe("0xB5 -> LDA zeropage,X", () => {
        beforeEach(() => {
            cpu.memory.readByte = jest.fn()
        });

        test("should load the correct value into the accumulator with X offset and update flags", () => {
            const instruction = OPCODES[0xB5];
            cpu.X = 0x10; // value of address
            const baseAddress = 0x42;
            const expectedAddress = (baseAddress + cpu.X) & 0xFF;
            cpu.memory.readByte.mockReturnValue(0x80);
            cpu.fetch = jest.fn(() => baseAddress);
            cpu.decode(instruction.code);

            expect(instruction.code).toBe(0xB5);
            expect(cpu.memory.readByte).toHaveBeenCalledWith(expectedAddress);
            expect(cpu.ACC).toBe(0x80);
            expect(cpu.negativeFlag).toBe(true);
            expect(cpu.zeroFlag).toBe(false);
        });

        test("should correctly update zero flag when loaded value is 0x00", () => {
            const instruction = OPCODES[0xB5];
            cpu.X = 0x10;
            const baseAddress = 0x42;
            const expectedAddress = (baseAddress + cpu.X) & 0xFF;
            cpu.memory.readByte.mockReturnValue(0x00);
            cpu.fetch = jest.fn(() => baseAddress);

            cpu.decode(instruction.code);

            expect(instruction.code).toBe(0xB5);
            expect(cpu.memory.readByte).toHaveBeenCalledWith(expectedAddress);
            expect(cpu.ACC).toBe(0x00);
            expect(cpu.negativeFlag).toBe(false);
            expect(cpu.zeroFlag).toBe(true);
        });
    });

    describe("0xC8 -> INY", () => {
        test("decode", () => {
            const instruction = OPCODES[0xC8];
            cpu.decode(instruction.code);

            expect(instruction.code).toBe(0xC8);
            expect(cpu.Y).toBe(0x01);
            expect(cpu.negativeFlag).toBe(false);
            expect(cpu.zeroFlag).toBe(false);
        });
    });

    describe("0xCA -> DEX", () => {
        test("decode", () => {
            const instruction = OPCODES[0xCA];
            cpu.X = 0x10; // 16
            cpu.decode(instruction.code);

            expect(instruction.code).toBe(0xCA);
            expect(cpu.X).toBe(0x0F); // 15
            expect(cpu.negativeFlag).toBe(false);
            expect(cpu.zeroFlag).toBe(false);

            cpu.X = 0;
            cpu.decode(instruction.code);

            expect(cpu.X).toBe(0xFF); // 8bit value max
            expect(cpu.negativeFlag).toBe(true);
            expect(cpu.zeroFlag).toBe(false)

            cpu.X = 0x01;
            cpu.decode(instruction.code);

            expect(cpu.X).toBe(0x00);
            expect(cpu.negativeFlag).toBe(false);
            expect(cpu.zeroFlag).toBe(true);
        });
    });

    describe("0xE8 -> INX", () => {
        test("decode", () => {
            const instruction = OPCODES[0xE8];
            cpu.decode(instruction.code);

            expect(instruction.code).toBe(0xE8);
            expect(cpu.X).toBe(0x01);
            expect(cpu.negativeFlag).toBe(false);
            expect(cpu.zeroFlag).toBe(false);
        });
    });
    
    describe("0xE9 -> SBC #immediate", () => {
        test("decode", () => {
            const instruction = OPCODES[0xE9];
            cpu.decode(instruction.code);

            expect(instruction.code).toBe(0xE9);
            expect(cpu.negativeFlag).toBe(true);
            expect(cpu.overflowFlag).toBe(true);
            expect(cpu.zeroFlag).toBe(false);
            expect(cpu.carryFlag).toBe(false);
        });
    });
    
    describe("0xEA -> NOP", () => {
        test("decode", () => {
            const instruction = OPCODES[0xEA];
            cpu.decode(instruction.code);
            
            expect(instruction.code).toBe(0xEA);
            expect(instruction.run).toBe(null);
        });
    });

});