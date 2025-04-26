interface LanguageModel {
    language: string,
    value: string
}

const languages: LanguageModel[] = [
    {
      language: "Python",
      value: 'def helloWorld():\n\treturn "Hello World"\nprint(helloWorld())'
    },
    {
      language: "JavaScript",
      value: 'function helloWorld() {\n\treturn "Hello World";\n}\nconsole.log(helloWorld());'
    },
    {
      language: "TypeScript",
      value: 'function helloWorld(): string {\n\treturn "Hello World";\n}\nconsole.log(helloWorld());'
    },
    {
      language: "C++",
      value: '#include <iostream>\nstd::string helloWorld() {\n\treturn "Hello World";\n}\nint main() {\n\tstd::cout << helloWorld() << std::endl;\n\treturn 0;\n}'
    },
    {
      language: "C#",
      value: 'using System;\nclass Program {\n\tstatic string HelloWorld() => "Hello World";\n\tstatic void Main() {\n\t\tConsole.WriteLine(HelloWorld());\n\t}\n}'
    },

    {
      language: "C",
      value: '#include <stdio.h>\nconst char* helloWorld() {\n\treturn "Hello World";\n}\nint main(void) {\n\tputs(helloWorld());\n\treturn 0;\n}'
    },
    {
      language: "Java",
      value: 'public class Main {\n\tstatic String helloWorld() { return "Hello World"; }\n\tpublic static void main(String[] args) {\n\t\tSystem.out.println(helloWorld());\n\t}\n}'
    },
    {
      language: "Go",
      value: 'package main\nimport "fmt"\nfunc helloWorld() string {\n\treturn "Hello World"\n}\nfunc main() {\n\tfmt.Println(helloWorld())\n}'
    },
    {
      language: "Rust",
      value: 'fn hello_world() -> &\'static str {\n\t"Hello World"\n}\nfn main() {\n\tprintln!("{}", hello_world());\n}'
    },
    {
      language: "Kotlin",
      value: 'fun helloWorld(): String = "Hello World"\nfun main() {\n\tprintln(helloWorld())\n}'
    }
  ];

export default languages;