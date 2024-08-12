import {describe, expect, test, beforeEach} from '@jest/globals';

import Memory from "../js/memory";
import CPU from "../js/cpu";


describe("memory:", () => {
    const memory = new Memory();

    test("memory size 64kb", () => {
        expect(memory.memory.length).toBe(0x10000);
    });

    test("memory clear", () => {
        const clearStatus = memory.memory.filter(Boolean).every((val) => val == 0);
        expect(clearStatus).toBe(true);
    });
});


describe("cpu:", () => {
    let memory, cpu, params;

    beforeEach(() => {
        params = {testing: true, running: false};
        memory = new Memory();
        cpu = new CPU(memory, params);
    });

    describe("unactive:", () => {
        test("running status off", () => {
            expect(cpu.running).toBe(false);
        });

        describe('default registers:', () => {
            test("PC (Program Counter)", () => {
                expect(cpu.PC).toBe(0x0600);
            });
            test("SP (Stack Pointer)", () => {
                expect(cpu.SP).toBe(0xFF);
            });
            test("ACC (Accumulator)", () => {
                expect(cpu.ACC).toBe(0x00);
            });
            test("X", () => {
                expect(cpu.X).toBe(0x00);
            });
            test("Y", () => {
                expect(cpu.Y).toBe(0x00);
            });
        });
        describe('default FLAG_STATUS:', () => {
            test("FLAG_STATUS -> 7bit (0x80) Negative(N)", () => {
                expect(cpu.FLAG_STATUS & 0x80).toBe(0x00);
            });
            test("FLAG_STATUS -> 6bit (0x40) Overflow(V)", () => {
                expect(cpu.FLAG_STATUS & 0x40).toBe(0x00);
            });
            test("FLAG_STATUS -> 5bit (0x20) Expansion(-)", () => {
                expect(cpu.FLAG_STATUS & 0x20).toBe(0x00);
            })
            test("FLAG_STATUS -> 4bit (0x10) Break(B)", () => {
                expect(cpu.FLAG_STATUS & 0x10).toBe(0x00);
            })
            test("FLAG_STATUS -> 3bit (0x08) Decimal(D)", () => {
                expect(cpu.FLAG_STATUS & 0x08).toBe(0x00);
            })
            test("FLAG_STATUS -> 2bit (0x04) Interrupt(I)", () => {
                expect(cpu.FLAG_STATUS & 0x04).toBe(0x00);
            })
            test("FLAG_STATUS -> 1bit (0x02) Zero(Z)", () => {
                expect(cpu.FLAG_STATUS & 0x02).toBe(0x00);
            })
            test("FLAG_STATUS -> 0bit (0x01) Carry(C)", () => {
                expect(cpu.FLAG_STATUS & 0x01).toBe(0x00);
            })
        });
    });


    describe('registers check:', () => {
        describe("min value:", () => {
            test("PC", () => {
                cpu.PC = 0x0000;
                expect(cpu.PC).toBe(0x0000);
            });
            test("SP", () => {
                cpu.SP = 0x00;
                expect(cpu.SP).toBe(0x00);
            });
            test("ACC", () => {
                cpu.ACC = 0x00;
                expect(cpu.ACC).toBe(0x00);
            });
            test("X", () => {
                cpu.X = 0x00;
                expect(cpu.X).toBe(0x00);
            });
            test("Y", () => {
                cpu.Y = 0x00;
                expect(cpu.Y).toBe(0x00);
            });
        })
        describe("max value:", () => {
            test("PC", () => {
                // max 16bit
                cpu.PC = 0xFFFF;
                expect(cpu.PC).toBe(0xFFFF);
            });
            test("SP", () => {
                // 8bit max 0xFF
                cpu.SP = 0xFF;
                expect(cpu.SP).toBe(0xFF);
            });
            test("ACC", () => {
                // 8bit max 0xFF
                cpu.ACC = 0xFF;
                expect(cpu.ACC).toBe(0xFF);
            });
            test("X", () => {
                // 8bit max 0xFF
                cpu.X = 0xFF;
                expect(cpu.X).toBe(0xFF);
            });
            test("Y", () => {
                // 8bit max 0xFF
                cpu.Y = 0xFF;
                expect(cpu.Y).toBe(0xFF);
            });
        });
        describe("after max value:", () => {
            test("PC", () => {
                // max 16bit is 0xFFFF, should always return 0 after limit 0xFFFF
                cpu.PC = 0xFFFF + 1;
                expect(cpu.PC).toBe(0x0000);
            });
            test("SP", () => {
                // 8bit max 0xFF
                cpu.SP = 0xFF + 1;
                expect(cpu.SP).toBe(0x00);
            });
            test("ACC", () => {
                // 8bit max 0xFF
                cpu.ACC = 0xFF + 1;
                expect(cpu.ACC).toBe(0x00);
            });
            test("X", () => {
                // 8bit max 0xFF
                cpu.X = 0xFF + 1;
                expect(cpu.X).toBe(0x00);
            });
            test("Y", () => {
                // 8bit max 0xFF
                cpu.Y = 0xFF + 1;
                expect(cpu.Y).toBe(0x00);
            });
        });
    });
});