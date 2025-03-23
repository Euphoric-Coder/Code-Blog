import React from "react";
import rehypeDocument from "rehype-document";
import rehypeFormat from "rehype-format";
import rehypeStringify from "rehype-stringify";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import rehypePrettyCode from "rehype-pretty-code";
import { transformerCopyButton } from "@rehype-pretty/transformers";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

const page = async () => {
  const blog = {
    author: "Sagnik",
    content:
      'Welcome to this comprehensive C programming tutorial! Whether you\'re a complete beginner or looking to deepen your understanding of C, this guide will take you through the fundamentals and introduce advanced concepts as you progress.\n\n## Introduction to C\n\nC is a powerful general-purpose programming language that is widely used in system programming, embedded systems, and applications requiring high performance. It is known for its efficiency, close-to-hardware control, and portability, making it a crucial language in the software industry.\n\n### Why Learn C?\n\n- **Foundation for Other Languages**: C provides the building blocks for many modern languages, such as C++, Java, and Python.\n- **Performance**: C is highly efficient and is used in performance-critical applications.\n- **Low-level Control**: C allows you to work closely with memory and hardware, providing more control over system resources.\n\n## Setting Up C\n\nTo get started with C programming, you\'ll need to set up a development environment. Here are the steps:\n\n1. **Install a C Compiler**: You can use GCC (GNU Compiler Collection) for Linux/macOS or MinGW for Windows. Both are free and widely used.\n2. **Choose an IDE/Text Editor**: Popular options include Visual Studio Code, Code::Blocks, or Eclipse. Alternatively, you can use a simple text editor like Sublime Text.\n3. **Verify Installation**: Once the compiler is installed, verify it by typing `gcc --version` in the terminal or command prompt.\n\n## C Basics\n\nNow that your environment is set up, let’s start with the basics. In this section, we\'ll cover:\n\n- **Variables and Data Types**: Learn how to declare and use variables in C.\n- **Control Structures**: Understand how to use conditional statements and loops.\n- **Functions**: Learn how to write reusable code blocks.\n\n### Variables and Data Types\n\n```c showLineNumbers {1-3} /printf/\n#include <stdio.h>\n\nint main() {\n    int age = 25;\n    float height = 5.9;\n    char initial = \'A\';\n\n    printf("Age: %d, Height: %.1f, Initial: %c\\n", age, height, initial);\n    return 0;\n}\n```\n\n### Control Structures\n\n```c\n#include <stdio.h>\n\nint main() {\n    int age = 20;\n\n    if (age >= 18) {\n        printf("You are an adult.\\n");\n    } else {\n        printf("You are a minor.\\n");\n    }\n\n    for (int i = 0; i < 5; i++) {\n        printf("Count: %d\\n", i);\n    }\n\n    return 0;\n}\n```\n\n### Functions\n\n```c\n#include <stdio.h>\n\nvoid greet(char name[]) {\n    printf("Hello, %s!\\n", name);\n}\n\nint main() {\n    greet("Alice");\n    return 0;\n}\n```\n\n## Intermediate C\n\nOnce you are familiar with the basics, it\'s time to explore more advanced features of C:\n\n- **Arrays and Pointers**: Learn how to work with arrays and pointers, which are fundamental in C programming.\n- **File I/O**: Understand how to read from and write to files.\n- **Dynamic Memory Allocation**: Explore memory management using `malloc`, `calloc`, and `free`.\n\n### Arrays and Pointers\n\n```c\n#include <stdio.h>\n\nint main() {\n    int numbers[5] = {1, 2, 3, 4, 5};\n    int *ptr = numbers;\n\n    for (int i = 0; i < 5; i++) {\n        printf("Number: %d, Address: %p\\n", *(ptr + i), (ptr + i));\n    }\n\n    return 0;\n}\n```\n\n### File I/O\n\n```c\n#include <stdio.h>\n\nint main() {\n    FILE *file = fopen("example.txt", "w");\n    if (file == NULL) {\n        printf("Error opening file!\\n");\n        return 1;\n    }\n\n    fprintf(file, "Hello, File!\\n");\n    fclose(file);\n\n    return 0;\n}\n```\n\n### Dynamic Memory Allocation\n\n```c\n#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int *arr;\n    int size = 5;\n\n    arr = (int*) malloc(size * sizeof(int));\n\n    for (int i = 0; i < size; i++) {\n        arr[i] = i + 1;\n        printf("Value: %d\\n", arr[i]);\n    }\n\n    free(arr);\n\n    return 0;\n}\n```\n\n## Advanced C\n\nNow that you are comfortable with intermediate topics, let’s move on to some advanced C programming concepts:\n\n- **Structures**: Learn how to group different data types together.\n- **Pointers to Functions**: Explore how to use pointers with functions for flexibility.\n- **Memory Management**: Delve deeper into memory management and optimization.\n\n### Structures\n\n```c\n#include <stdio.h>\n\nstruct Student {\n    char name[50];\n    int age;\n    float grade;\n};\n\nint main() {\n    struct Student s1 = {"Alice", 20, 85.5};\n\n    printf("Name: %s, Age: %d, Grade: %.2f\\n", s1.name, s1.age, s1.grade);\n    return 0;\n}\n```\n\n### Pointers to Functions\n\n```c\n#include <stdio.h>\n\nvoid add(int a, int b) {\n    printf("Sum: %d\\n", a + b);\n}\n\nint main() {\n    void (*func_ptr)(int, int) = &add;\n    func_ptr(10, 20);\n\n    return 0;\n}\n```\n\n### Memory Management\n\n```c\n#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int *arr;\n    int size = 10;\n\n    arr = (int*) malloc(size * sizeof(int));\n\n    if (arr == NULL) {\n        printf("Memory not allocated.\\n");\n        return 1;\n    }\n\n    for (int i = 0; i < size; i++) {\n        arr[i] = i * 2;\n        printf("Value: %d\\n", arr[i]);\n    }\n\n    free(arr);\n\n    return 0;\n}\n```\n\n## Conclusion\n\nCongratulations on making it through this C programming tutorial! You’ve covered everything from the basics of C to advanced topics like structures and memory management. Keep practicing and exploring the vast capabilities of C to enhance your programming skills.\n\nHappy coding!',
    slug: "test-blog",
    title: "Test Blog",
  };

  // Initialize the unified processor to convert markdown to HTML
  const processor = unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeDocument, { title: blog.title || "Blog Post" })
    .use(rehypeFormat)
    .use(rehypeStringify)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings)
    .use(rehypePrettyCode, {
      theme: "github-dark-dimmed",
      transformers: [
        transformerCopyButton({
          visibility: "always",
          feedbackDuration: 3_000,
        }),
      ],
    });

  const htmlContent = (await processor.process(blog.content)).toString();

  return (
    <div className="max-w-[95%] mx-auto p-4">
      {/* Main container for flex layout */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar - takes up the left part of the screen on large screens */}
        <div className="lg:w-1/5 hidden lg:block">
          {/* <OnThisPage htmlContent={htmlContent} /> */}
        </div>

        {/* Main content - takes up the remaining space */}
        <div className="lg:w-4/5 w-full">
          <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
          <p className="text-base mb-2 border-l-4 border-gray-500 pl-4 italic">
            {/* &quot;{data.description}&quot; */}
            This is just a description
          </p>
          <div className="flex gap-2 mb-10">
            <p className="text-sm text-gray-500 mb-4 italic">
              By {blog.author}
            </p>
            {/* <p className="text-sm text-gray-500 mb-4">{data.date}</p> */}
            <p className="text-sm text-gray-500 mb-4">
              {Date.now().toString()}
            </p>
          </div>
          <div
            dangerouslySetInnerHTML={{ __html: htmlContent }}
            className="prose prose-lg dark:prose-invert max-w-none"
          ></div>
        </div>
      </div>
    </div>
  );
};

export default page;
