### Opcodes progress by Instructions:

<details>
    <summary><b>Opcodes for <span style="color: orange">LDA - Load Accumulator with Memory</span></b></summary>

| Dec | Opcode |   Instruction    |    Mode    | Cycles | Status |
|:---:|:------:|:----------------:|:----------:|:------:|:------:|
| 169 |  0xA9  |  LDA #immediate  | Immediate  |   2    |   ✅️   |
| 165 |  0xA5  |   LDA zeropage   |  Zeropage  |   3    |   ✅️   |
| 181 |  0xB5  |  LDA zeropage,X  | Zeropage,X |   4    |   ✅️   |
| 173 |  0xAD  |   LDA absolute   |  Absolute  |   4    |   ✅    |
| 189 |  0xBD  |  LDA absolute,X  | Absolute,X | 4 (+1) |   ✅    |
| 185 |  0xB9  |  LDA absolute,Y  | Absolute,Y | 4 (+1) |   ✅    |
| 161 |  0xA1  | LDA (indirect,X) | Indirect,X |   6    |   ✅    |
| 177 |  0xB1  | LDA (indirect),Y | Indirect,Y | 5 (+1) |   ✅    |

</details>

<details open>
    <summary><b>Opcodes for <span style="color: orange">LDX - Load Index Register X From Memory</span></b></summary>

| Decimal | Opcode |    Mnemonic    | Addressing Mode | Cycles | Implemented |
|:-------:|:------:|:--------------:|:---------------:|:------:|:-----------:|
|   169   |  0xA2  | LDX #immediate |    Immediate    |   2    |      ✅      |
|   181   |  0xA6  |  LDX zeropage  |    Zeropage     |   3    |             |
|   197   |  0xB6  | LDX zeropage,Y |   Zeropage,Y    |   4    |             |
|   173   |  0xAE  |  LDX absolute  |    Absolute     |   4    |             |
|   189   |  0xBE  | LDX absolute,Y |   Absolute,Y    | 4 (+1) |             |

</details>




### Opcodes (23/151)

| Dec | Opcode |  Instruction   | Status |
|:---:|:------:|:--------------:|:------:|
|  0  |  0x00  |      BRK       |   ✅    |
|  9  |  0x09  | ORA #immediate |   ✅    |
| 29  |  0x29  | AND #immediate |   ✅    |
| 41  |  0x49  | EOR #immediate |   ✅    |
| 84  |  0x84  |  STY zeropage  |   ✅    |
| 85  |  0x85  |  STA zeropage  |   ✅    |
| 86  |  0x86  |  STX zeropage  |   ✅    |
| 88  |  0x88  |      DEY       |   ✅    |
| 90  |  0x90  |      BCC       |   ✅    |
| 98  |  0x98  |      TYA       |   ✅    |
| 105 |  0x69  | ADC #immediate |   ✅    |
| 138 |  0x8A  |      TXA       |   ✅    |
| 160 |  0xA0  | LDY #immediate |   ✅    |
| 162 |  0xA2  | LDX #immediate |   ✅    |
| 168 |  0xA8  |      TAY       |   ✅    |
| 170 |  0xAA  |      TAX       |   ✅    |
| 200 |  0xC8  |      INY       |   ✅    |
| 202 |  0xCA  |      DEX       |   ✅    |
| 232 |  0xE8  |      INX       |   ✅    |
| 233 |  0xE9  | SBC #immediate |   ✅    |
| 234 |  0xEA  |      NOP       |   ✅    |
