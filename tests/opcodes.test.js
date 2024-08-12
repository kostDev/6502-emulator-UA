import {describe, expect, test, beforeEach} from "@jest/globals";

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