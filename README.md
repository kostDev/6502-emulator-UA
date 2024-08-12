## 6502 Emulator UA🇺🇦

A minimalist and educational 6502 CPU emulator written in JavaScript. This project is designed for learning and experimentation, focusing on the core functionality of the 6502 processor.

Features

	•	Basic Instruction Set: Implements a subset of the 6502 instruction set, allowing for the execution of simple programs.
	•	16-bit Addressing: Supports 16-bit memory addressing with 8-bit data registers.
	•	Memory Management: Includes basic read/write operations for memory handling.
	•	Customizable: Designed with simplicity in mind, making it easy to extend and modify.
 	•	Testing: Covered with tests 11/151 OPCODES, which are official and documented guidelines. (in progress)
  
Installation

Clone the repository and navigate to the project directory:

```bash
git clone https://github.com/kostDev/6502-emulator-UA.git
cd 6502-emulator-UA
```
Usage

To start using the emulator, simply include the emulator.js file in your project and create an instance of the Emulator class:

```js
import Memory from "./memory";
import CPU from "./cpu";

const params = {
    testing: false,
    running: false
}
const cpu = new CPU(new Memory(0x10000), params); // 64kb -> 0x10000
// emulator.loadProgram(yourProgram); // in future
cpu.run();
```

Roadmap

	•	Implement full 6502 instruction set. Current 11/151 (256)
	•	Add debugging tools.
	•	Create example programs for testing and learning.
	•	Develop a simple UI for interactive use.

License

This project is licensed under the MIT License - see the LICENSE file for details.

Цей README надає основну інформацію про проект, включаючи інструкції з встановлення, використання та плани на майбутнє. 
Він достатньо простий і зрозумілий, щоб ви могли швидко почати працювати з моїм емулятором.
Зроблено в Україні (Made in Ukraine 🇺🇦).


