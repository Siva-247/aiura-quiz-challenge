export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "What is wrong with the following code?\n\ndef add_items(item, item_list=[]):\n    item_list.append(item)\n    return item_list\n\nprint(add_items(1))\nprint(add_items(2))",
    options: [
      "Nothing, it works correctly",
      "Default mutable argument causes unexpected behavior",
      "Syntax error", 
      "item_list is undefined"
    ],
    correctAnswer: 1
  },
  {
    id: 2,
    question: "What is returned?\n\nSELECT department, AVG(salary) FROM Employees GROUP BY department;",
    options: [
      "Average salary",
      "Total salary",
      "Average salary per department",
      "Maximum salary"
    ],
    correctAnswer: 2
  },
  {
    id: 3,
    question: "To dynamically allocate a 2D array:",
    options: [
      "int a[5][5];",
      "malloc(rows * cols * sizeof(int))",
      "calloc(rows, cols)",
      "int *a = new int[rows][cols];"
    ],
    correctAnswer: 1
  },
  {
    id: 4,
    question: "#include<iostream>\nusing namespace std;\nint main() {\n    int x = 10;\n    int &ref = x;\n    ref++;\n    cout << x;\n}",
    options: ["10", "11", "0", "Error"],
    correctAnswer: 1
  },
  {
    id: 5,
    question: "What is the output of this recursive Fibonacci function?\n\ndef fib(n):\n    if n <= 1:\n        return n\n    return fib(n-1) + fib(n-2)\n\nprint(fib(4))",
    options: ["3", "4", "5", "6"],
    correctAnswer: 0
  },
  {
    id: 6,
    question: "Find the error:\n\n#include <stdio.h>\nint main() {\n    int a = 5;\n    int *p;\n    printf(\"%d\", *p);\n    return 0;\n}",
    options: [
      "Compiles and prints 5",
      "Dereferencing uninitialized pointer",
      "Syntax error",
      "Pointer arithmetic error"
    ],
    correctAnswer: 1
  },
  {
    id: 7,
    question: "Identify the error:\n\nINSERT INTO employees (id, name) VALUES (1);",
    options: [
      "Syntax is correct",
      "Missing value for name column",
      "id must be auto-increment", 
      "Table doesn't exist"
    ],
    correctAnswer: 1
  },
  {
    id: 8,
    question: "Which of these correctly implements memoization in Python?",
    options: [
      "def fib(n):\n    if n <= 1:\n        return n\n    return fib(n-1) + fib(n-2)",
      "from functools import lru_cache\n\n@lru_cache(maxsize=None)\ndef fib(n):\n    if n <= 1:\n        return n\n    return fib(n-1) + fib(n-2)",
      "fib = lambda n: n if n<=1 else fib(n-1)+fib(n-2)",
      "None of the above"
    ],
    correctAnswer: 1
  },
  {
    id: 9,
    question: "What will this print?\n\nclass Test {\n    public void main(String[] args) {\n        System.out.println(\"Hello\");\n    }\n}",
    options: [
      "Hello",
      "Nothing, main must be static",
      "Compile error",
      "Runtime error"
    ],
    correctAnswer: 1
  },
  {
    id: 10,
    question: "Which of the following elements is self-closing in HTML5?",
    options: ["<p>", "<img>", "<div>", "<span>"],
    correctAnswer: 1
  },
  {
    id: 11,
    question: "Which of the following demonstrates a closure in Python?",
    options: [
      "def outer(x):\n    def inner(y):\n        return x + y\n    return inner\nf = outer(10)\nprint(f(5))",
      "def add(x, y):\n    return x+y",
      "class A:\n    pass",
      "lambda x: x+1"
    ],
    correctAnswer: 0
  },
  {
    id: 12,
    question: "Why does this code raise an error?\n\nimport json\ndata = {'a':1, 'b':2}\ns = json.dumps(data)\nprint(s['a'])",
    options: [
      "Works fine",
      "Cannot index string with key",
      "Syntax error",
      "JSON module not imported"
    ],
    correctAnswer: 1
  },
  {
    id: 13,
    question: "Detect the error in property decorator usage:\n\nclass Circle:\n    def __init__(self, radius):\n        self._radius = radius\n\n    @property\n    def radius(self):\n        return self._radius\n\nc = Circle(5)\nc.radius = 10",
    options: [
      "Works fine",
      "AttributeError: can't set attribute",
      "Syntax error",
      "TypeError"
    ],
    correctAnswer: 1
  },
  {
    id: 14,
    question: "What is wrong with this join?\n\nSELECT e.name, d.dept_name\nFROM employees e, departments d\nWHERE e.dept_id = d.id(+);",
    options: [
      "Works fine",
      "Syntax error in ANSI SQL",
      "Wrong column names", 
      "Missing alias"
    ],
    correctAnswer: 1
  },
  {
    id: 15,
    question: "What is the issue in this list comprehension?\n\nnums = [1, 2, 3, 4]\nsquared = [x*x for x in nums if x>2 else x]",
    options: [
      "No issue; runs fine",
      "SyntaxError due to else in comprehension",
      "Logical error; output is [1, 4, 9, 16]",
      "TypeError"
    ],
    correctAnswer: 1
  },
  {
    id: 16,
    question: "Identify the semantic error:\n\n<header>\n  <footer>This is footer inside header</footer>\n</header>",
    options: [
      "Valid HTML",
      "Will throw a browser error", 
      "Invalid nesting; footer cannot be inside header",
      "Renders nothing"
    ],
    correctAnswer: 2
  },
  {
    id: 17,
    question: "What does encapsulation mean in OOP?",
    options: [
      "Binding data and functions into a single unit",
      "Deriving new classes from existing ones",
      "Hiding the implementation details from the user",
      "Allowing multiple methods to have the same name"
    ],
    correctAnswer: 0
  },
  {
    id: 18,
    question: "Which method is used in Python to make a deep copy of an object?",
    options: [
      "copy.deepcopy()",
      "copy.copy()",
      "object.clone()",
      "pickle.dumps()"
    ],
    correctAnswer: 0
  },
  {
    id: 19,
    question: "Why does this string code not change x?\n\nx = \"hello\"\ny = x\ny += \" world\"\nprint(x)",
    options: [
      "Strings are immutable; y += \" world\" creates a new string",
      "x is overwritten automatically",
      "Python disallows += for strings",
      "Both x and y change"
    ],
    correctAnswer: 0
  },
  {
    id: 20,
    question: "Which of the following statements about Java memory management is true?",
    options: [
      "Java allows explicit memory deallocation using free()",
      "The Garbage Collector can guarantee when an object will be destroyed",
      "finalize() is guaranteed to be called before garbage collection",
      "Garbage collection is automatic, but the exact time of collection is not guaranteed"
    ],
    correctAnswer: 3
  },
  {
    id: 21,
    question: "What is the output of this query?\n\nSELECT department_id, COUNT(*) \nFROM employees\nGROUP BY department_id\nHAVING COUNT(*) > 5;",
    options: [
      "Departments with exactly 5 employees",
      "Departments with more than 5 employees", 
      "Employees count for all departments",
      "Compilation error"
    ],
    correctAnswer: 1
  },
  {
    id: 22,
    question: "When debugging a deadlock in Java, which tool/command is most useful?",
    options: [
      "System.out.println()",
      "jconsole or jvisualvm",
      "javac",
      "javap"
    ],
    correctAnswer: 1
  },
  {
    id: 23,
    question: "Which feature of OOP enables code reuse?",
    options: ["Polymorphism", "Inheritance", "Encapsulation", "Abstraction"],
    correctAnswer: 1
  },
  {
    id: 24,
    question: "Which attribute specifies an external CSS file in HTML?",
    options: ["href", "src", "link", "rel"],
    correctAnswer: 0
  },
  {
    id: 25,
    question: "What is the default return type of a C function if not specified (pre-C99)?",
    options: ["void", "int", "float", "Error"],
    correctAnswer: 1
  },
  {
    id: 26,
    question: "What will this query return?\n\nSELECT department_id, MAX(salary) \nFROM employees\nGROUP BY department_id\nHAVING MAX(salary) > 10000;",
    options: [
      "All departments",
      "Departments with maximum salary > 10000", 
      "Employees with salary > 10000",
      "Compilation error"
    ],
    correctAnswer: 1
  },
  {
    id: 27,
    question: "What happens here?\n\na = [1,2,3,4]\nprint(a[4])",
    options: ["4", "IndexError", "None", "Error"],
    correctAnswer: 1
  },
  {
    id: 28,
    question: "Why is <meta charset=\"UTF-8\"> recommended at the start of <head>?",
    options: [
      "No effect on placement",
      "Characters before meta tag may be misinterpreted",
      "Only used for CSS", 
      "Causes runtime error if not first"
    ],
    correctAnswer: 1
  },
  {
    id: 29,
    question: "What will be the output?\n\na = [1, 2, 3]\nb = a\nc = a[:]\nb[0] = 10\nc[1] = 20\nprint(a, b, c)",
    options: [
      "[10, 2, 3] [10, 2, 3] [1, 20, 3]",
      "[1, 2, 3] [10, 2, 3] [1, 20, 3]",
      "[1, 2, 3] [1, 2, 3] [1, 20, 3]",
      "[10, 20, 3] [10, 20, 3] [1, 20, 3]"
    ],
    correctAnswer: 0
  },
  {
    id: 30,
    question: "Which keyword is used to inherit a class in C++?",
    options: [
      "implements",
      "extends", 
      "inherits",
      ": (colon)"
    ],
    correctAnswer: 3
  }
];