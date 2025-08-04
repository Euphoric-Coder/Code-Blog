import React, { useState, useRef } from "react";
import {
  Play,
  Square,
  Download,
  Share2,
  Settings,
  Code,
  Terminal,
  FileText,
  Loader,
} from "lucide-react";
import Editor from "@monaco-editor/react";
import { useUser } from "@clerk/nextjs";

export const PlaygroundPage = () => {
  const { user, isSignedIn } = useUser();
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [code, setCode] = useState("");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [isEditorReady, setIsEditorReady] = useState(false);
  const [theme, setTheme] = useState("vs-dark");
  const editorRef = useRef(null);

  const languages = [
    {
      id: "javascript",
      name: "JavaScript",
      version: "Node.js 18.15.0",
      extension: "js",
      monacoLanguage: "javascript",
      defaultCode: `// JavaScript Playground
const readline = require('readline');

// Example: Interactive input/output
console.log('JavaScript Code Execution');

// Array operations
const numbers = [1, 2, 3, 4, 5];
const squares = numbers.map(n => n * n);
console.log('Original numbers:', numbers);
console.log('Squared numbers:', squares);

// String manipulation
const message = "Hello, Code Playground!";
console.log('Message:', message);
console.log('Uppercase:', message.toUpperCase());

// Mathematical operations
const sum = numbers.reduce((acc, curr) => acc + curr, 0);
console.log('Sum of numbers:', sum);

// Date and time
const now = new Date();
console.log('Current time:', now.toLocaleString());`,
    },
    {
      id: "python",
      name: "Python",
      version: "3.10.0",
      extension: "py",
      monacoLanguage: "python",
      defaultCode: `# Python Playground
import math
import datetime

print("Python Code Execution")

# Function to demonstrate input/output
def fibonacci(n):
    """Generate Fibonacci sequence up to n terms"""
    if n <= 0:
        return []
    elif n == 1:
        return [0]
    elif n == 2:
        return [0, 1]
    
    fib = [0, 1]
    for i in range(2, n):
        fib.append(fib[i-1] + fib[i-2])
    return fib

# Generate Fibonacci numbers
fib_sequence = fibonacci(10)
print("Fibonacci sequence:", fib_sequence)

# List comprehensions
numbers = [1, 4, 9, 16, 25]
square_roots = [math.sqrt(x) for x in numbers]
print("Square roots:", square_roots)

# Dictionary operations
squares_dict = {x: x**2 for x in range(1, 6)}
print("Squares dictionary:", squares_dict)

# Date and time
current_time = datetime.datetime.now()
print("Current time:", current_time.strftime("%Y-%m-%d %H:%M:%S"))

# String operations
text = "Hello, Python World!"
print("Original text:", text)
print("Reversed text:", text[::-1])`,
    },
    {
      id: "java",
      name: "Java",
      version: "OpenJDK 17.0.0",
      extension: "java",
      monacoLanguage: "java",
      defaultCode: `// Java Playground
import java.util.*;
import java.util.stream.*;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class Main {
    public static void main(String[] args) {
        System.out.println("Java Code Execution");
        
        // Array and Stream operations
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
        
        // Filter even numbers and square them
        List<Integer> evenSquares = numbers.stream()
            .filter(n -> n % 2 == 0)
            .map(n -> n * n)
            .collect(Collectors.toList());
        
        System.out.println("Original numbers: " + numbers);
        System.out.println("Even numbers squared: " + evenSquares);
        
        // String operations
        String message = "Hello, Java World!";
        System.out.println("Message: " + message);
        System.out.println("Length: " + message.length());
        System.out.println("Uppercase: " + message.toUpperCase());
        
        // Mathematical operations
        int sum = numbers.stream().mapToInt(Integer::intValue).sum();
        System.out.println("Sum of all numbers: " + sum);
        
        // Date and time
        LocalDateTime now = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        System.out.println("Current time: " + now.format(formatter));
        
        // Collections
        Map<String, Integer> wordCount = new HashMap<>();
        wordCount.put("Java", 1);
        wordCount.put("Programming", 2);
        wordCount.put("Code", 3);
        System.out.println("Word count: " + wordCount);
    }
}`,
    },
    {
      id: "cpp",
      name: "C++",
      version: "GCC 9.4.0",
      extension: "cpp",
      monacoLanguage: "cpp",
      defaultCode: `// C++ Playground
#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
#include <cmath>
#include <iomanip>

using namespace std;

int main() {
    cout << "C++ Code Execution" << endl;
    
    // Vector operations
    vector<int> numbers = {1, 2, 3, 4, 5};
    cout << "Original numbers: ";
    for (int num : numbers) {
        cout << num << " ";
    }
    cout << endl;
    
    // Transform vector (square each element)
    vector<int> squares;
    transform(numbers.begin(), numbers.end(), back_inserter(squares),
              [](int n) { return n * n; });
    
    cout << "Squared numbers: ";
    for (int square : squares) {
        cout << square << " ";
    }
    cout << endl;
    
    // String operations
    string message = "Hello, C++ World!";
    cout << "Message: " << message << endl;
    cout << "Length: " << message.length() << endl;
    
    // Mathematical operations
    double pi = 3.14159;
    cout << fixed << setprecision(2);
    cout << "Pi: " << pi << endl;
    cout << "Square root of 16: " << sqrt(16) << endl;
    
    // Find maximum element
    auto max_element_it = max_element(numbers.begin(), numbers.end());
    cout << "Maximum element: " << *max_element_it << endl;
    
    return 0;
}`,
    },
    {
      id: "c",
      name: "C",
      version: "GCC 9.4.0",
      extension: "c",
      monacoLanguage: "c",
      defaultCode: `// C Playground
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <math.h>

int main() {
    printf("C Code Execution\\n");
    
    // Array operations
    int numbers[] = {1, 2, 3, 4, 5};
    int size = sizeof(numbers) / sizeof(numbers[0]);
    
    printf("Original numbers: ");
    for (int i = 0; i < size; i++) {
        printf("%d ", numbers[i]);
    }
    printf("\\n");
    
    // Calculate squares
    printf("Squared numbers: ");
    for (int i = 0; i < size; i++) {
        printf("%d ", numbers[i] * numbers[i]);
    }
    printf("\\n");
    
    // String operations
    char message[] = "Hello, C World!";
    printf("Message: %s\\n", message);
    printf("Length: %lu\\n", strlen(message));
    
    // Mathematical operations
    double pi = 3.14159;
    printf("Pi: %.2f\\n", pi);
    printf("Square root of 16: %.2f\\n", sqrt(16.0));
    
    // Sum calculation
    int sum = 0;
    for (int i = 0; i < size; i++) {
        sum += numbers[i];
    }
    printf("Sum of numbers: %d\\n", sum);
    
    return 0;
}`,
    },
    {
      id: "go",
      name: "Go",
      version: "1.16.2",
      extension: "go",
      monacoLanguage: "go",
      defaultCode: `// Go Playground
package main

import (
    "fmt"
    "math"
    "strings"
    "time"
)

func main() {
    fmt.Println("Go Code Execution")
    
    // Slice operations
    numbers := []int{1, 2, 3, 4, 5}
    fmt.Printf("Original numbers: %v\\n", numbers)
    
    // Calculate squares
    var squares []int
    for _, num := range numbers {
        squares = append(squares, num*num)
    }
    fmt.Printf("Squared numbers: %v\\n", squares)
    
    // String operations
    message := "Hello, Go World!"
    fmt.Printf("Message: %s\\n", message)
    fmt.Printf("Length: %d\\n", len(message))
    fmt.Printf("Uppercase: %s\\n", strings.ToUpper(message))
    
    // Mathematical operations
    pi := 3.14159
    fmt.Printf("Pi: %.2f\\n", pi)
    fmt.Printf("Square root of 16: %.2f\\n", math.Sqrt(16))
    
    // Sum calculation
    sum := 0
    for _, num := range numbers {
        sum += num
    }
    fmt.Printf("Sum of numbers: %d\\n", sum)
    
    // Current time
    now := time.Now()
    fmt.Printf("Current time: %s\\n", now.Format("2006-01-02 15:04:05"))
    
    // Map example
    wordCount := map[string]int{
        "Go":          1,
        "Programming": 2,
        "Code":        3,
    }
    fmt.Printf("Word count: %v\\n", wordCount)
}`,
    },
    {
      id: "rust",
      name: "Rust",
      version: "1.68.2",
      extension: "rs",
      monacoLanguage: "rust",
      defaultCode: `// Rust Playground
use std::collections::HashMap;

fn main() {
    println!("Rust Code Execution");
    
    // Vector operations
    let numbers = vec![1, 2, 3, 4, 5];
    println!("Original numbers: {:?}", numbers);
    
    // Calculate squares using iterator
    let squares: Vec<i32> = numbers.iter().map(|&x| x * x).collect();
    println!("Squared numbers: {:?}", squares);
    
    // String operations
    let message = "Hello, Rust World!";
    println!("Message: {}", message);
    println!("Length: {}", message.len());
    println!("Uppercase: {}", message.to_uppercase());
    
    // Mathematical operations
    let pi = 3.14159;
    println!("Pi: {:.2}", pi);
    println!("Square root of 16: {:.2}", (16.0_f64).sqrt());
    
    // Sum calculation
    let sum: i32 = numbers.iter().sum();
    println!("Sum of numbers: {}", sum);
    
    // HashMap example
    let mut word_count = HashMap::new();
    word_count.insert("Rust", 1);
    word_count.insert("Programming", 2);
    word_count.insert("Code", 3);
    println!("Word count: {:?}", word_count);
    
    // Pattern matching
    for &num in &numbers {
        match num % 2 {
            0 => println!("{} is even", num),
            _ => println!("{} is odd", num),
        }
    }
}`,
    },
    {
      id: "php",
      name: "PHP",
      version: "8.2.3",
      extension: "php",
      monacoLanguage: "php",
      defaultCode: `<?php
// PHP Playground
define('PI', 3.14159);

echo "PHP Code Execution\\n";

// Array operations
$numbers = [1, 2, 3, 4, 5];
echo "Original numbers: " . implode(", ", $numbers) . "\\n";

// Calculate squares
$squares = array_map(function($n) { return $n * $n; }, $numbers);
echo "Squared numbers: " . implode(", ", $squares) . "\\n";

// String operations
$message = "Hello, PHP World!";
echo "Message: $message\\n";
echo "Length: " . strlen($message) . "\\n";
echo "Uppercase: " . strtoupper($message) . "\\n";

// Mathematical operations
echo "Pi: " . number_format(PI, 2) . "\\n";
echo "Square root of 16: " . sqrt(16) . "\\n";

// Sum calculation
$sum = array_sum($numbers);
echo "Sum of numbers: $sum\\n";

// Associative array
$wordCount = [
    "PHP" => 1,
    "Programming" => 2,
    "Code" => 3
];
echo "Word count: " . json_encode($wordCount) . "\\n";

// Date and time
$currentTime = date('Y-m-d H:i:s');
echo "Current time: $currentTime\\n";

// Filter even numbers
$evenNumbers = array_filter($numbers, function($n) { return $n % 2 == 0; });
echo "Even numbers: " . implode(", ", $evenNumbers) . "\\n";
?>`,
    },
    {
      id: "ruby",
      name: "Ruby",
      version: "3.0.1",
      extension: "rb",
      monacoLanguage: "ruby",
      defaultCode: `# Ruby Playground
puts "Ruby Code Execution"

# Array operations
numbers = [1, 2, 3, 4, 5]
puts "Original numbers: " + numbers.join(', ')

# Calculate squares
squares = numbers.map { |n| n * n }
puts "Squared numbers: " + squares.join(', ')

# String operations
message = "Hello, Ruby World!"
puts "Message: " + message
puts "Length: " + message.length.to_s
puts "Uppercase: " + message.upcase

# Mathematical operations
puts sprintf("Pi: %.2f", Math::PI)
puts "Square root of 16: " + Math.sqrt(16).to_s

# Sum calculation
sum = numbers.sum
puts "Sum of numbers: " + sum.to_s

# Hash example
word_count = {
  "Ruby" => 1,
  "Programming" => 2,
  "Code" => 3
}
puts "Word count: " + word_count.to_s

# Current time
current_time = Time.now
puts "Current time: " + current_time.strftime('%Y-%m-%d %H:%M:%S')

# Filter even numbers
even_numbers = numbers.select { |n| n.even? }
puts "Even numbers: " + even_numbers.join(', ')

# Block iteration
puts "Number analysis:"
numbers.each_with_index do |num, index|
  puts "  Index " + index.to_s + ": " + num.to_s + " is " + (num.even? ? 'even' : 'odd')
end`,
    },
    {
      id: "csharp",
      name: "C#",
      version: ".NET 6.0",
      extension: "cs",
      monacoLanguage: "csharp",
      defaultCode: `// C# Playground
using System;
using System.Collections.Generic;
using System.Linq;

class Program
{
    static void Main()
    {
        Console.WriteLine("C# Code Execution");
        
        // Array operations
        int[] numbers = {1, 2, 3, 4, 5};
        Console.WriteLine("Original numbers: [{0}]", string.Join(", ", numbers));
        
        // Calculate squares using LINQ
        var squares = numbers.Select(n => n * n).ToArray();
        Console.WriteLine("Squared numbers: [{0}]", string.Join(", ", squares));
        
        // String operations
        string message = "Hello, C# World!";
        Console.WriteLine("Message: {0}", message);
        Console.WriteLine("Length: {0}", message.Length);
        Console.WriteLine("Uppercase: {0}", message.ToUpper());
        
        // Mathematical operations
        double pi = 3.14159;
        Console.WriteLine("Pi: {0:F2}", pi);
        Console.WriteLine("Square root of 16: {0:F2}", Math.Sqrt(16));
        
        // Sum calculation
        int sum = numbers.Sum();
        Console.WriteLine("Sum of numbers: {0}", sum);
        
        // Dictionary example
        var wordCount = new Dictionary<string, int>
        {
            {"C#", 1},
            {"Programming", 2},
            {"Code", 3}
        };
        Console.WriteLine("Word count: {0}", string.Join(", ", wordCount.Select(kv => kv.Key + "=" + kv.Value)));
        
        // Current time
        DateTime now = DateTime.Now;
        Console.WriteLine("Current time: {0:yyyy-MM-dd HH:mm:ss}", now);
        
        // Filter even numbers
        var evenNumbers = numbers.Where(n => n % 2 == 0).ToArray();
        Console.WriteLine("Even numbers: [{0}]", string.Join(", ", evenNumbers));
        
        // Foreach with index
        Console.WriteLine("Number analysis:");
        for (int i = 0; i < numbers.Length; i++)
        {
            string type = numbers[i] % 2 == 0 ? "even" : "odd";
            Console.WriteLine("  Index {0}: {1} is {2}", i, numbers[i], type);
        }
    }
}`,
    },
  ];

  const getCurrentLanguage = () => {
    return (
      languages.find((lang) => lang.id === selectedLanguage) || languages[0]
    );
  };

  const handleLanguageChange = (languageId) => {
    const language = languages.find((lang) => lang.id === languageId);
    if (language) {
      setSelectedLanguage(languageId);
      setCode(language.defaultCode);
      setOutput("");
    }
  };

  const logExecution = async ({ language, code, output, createdBy }) => {
    await fetch("/api/playground/execute", {
      method: "POST",
      body: JSON.stringify({ language, code, output, createdBy }),
      headers: { "Content-Type": "application/json" },
    });
  };

  const logDownload = async ({ language, createdBy }) => {
    await fetch("/api/playground/download", {
      method: "POST",
      body: JSON.stringify({ language, createdBy }),
      headers: { "Content-Type": "application/json" },
    });
  };

  const runCode = async () => {
    const currentCode = editorRef.current?.getValue(); // Gets latest from editor directly
    setIsRunning(true);
    setOutput("Running code...\n");

    try {
      const response = await fetch("https://emkc.org/api/v2/piston/execute", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          language: selectedLanguage,
          version: "*",
          files: [
            {
              name: `main.${getCurrentLanguage().extension}`,
              content: currentCode || code, // fallback to state value
            },
          ],
          stdin: input,
        }),
      });

      const result = await response.json();

      if (result.run) {
        let output = "";
        if (result.run.stdout) {
          output += result.run.stdout;
        }
        if (result.run.stderr) {
          output += "\nErrors:\n" + result.run.stderr;
        }
        if (!result.run.stdout && !result.run.stderr) {
          output = "Code executed successfully with no output.";
        }
        setOutput(output);
        if (isSignedIn) {
          await logExecution({
            language: selectedLanguage,
            code: currentCode || code,
            output,
            createdBy: user?.primaryEmailAddress?.emailAddress,
          });
        }
      } else {
        setOutput("Error: Unable to execute code. Please try again.");
      }
    } catch (error) {
      setOutput(
        "Error: Failed to connect to execution service. Please check your internet connection and try again."
      );
    } finally {
      setIsRunning(false);
    }
  };

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
    setIsEditorReady(true);

    // Add keyboard shortcut for running code
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
      (async () => {
        await runCode();
      })();
    });
  };

  const downloadCode = () => {
    const language = getCurrentLanguage();
    const blob = new Blob([code], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `playground.${language.extension}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    if(isSignedIn) {
      logDownload({
        language: selectedLanguage,
        createdBy: user?.primaryEmailAddress?.emailAddress,
      });
    }
  };

  const shareCode = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Code Playground",
          text: "Check out this code snippet!",
          url: window.location.href,
        });
      } catch (error) {
        // Fallback to clipboard
        navigator.clipboard.writeText(code);
        alert("Code copied to clipboard!");
      }
    } else {
      navigator.clipboard.writeText(code);
      alert("Code copied to clipboard!");
    }
  };

  // Initialize with default code
  React.useEffect(() => {
    const defaultLang = getCurrentLanguage();
    setCode(defaultLang.defaultCode);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      {/* Hero Section */}
      <section className="relative py-12 bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-indigo-400/10 to-purple-400/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-purple-400/10 to-indigo-400/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-4">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
              <span className="block text-gray-900 dark:text-white">Code</span>
              <span className="block bg-gradient-to-r p-2 from-indigo-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Playground
              </span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Write, run, and experiment with code in {languages.length}+
              programming languages. Perfect for learning, testing, and
              prototyping.
            </p>
          </div>
        </div>
      </section>

      {/* Playground Interface */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Toolbar */}
          <div className="bg-white dark:bg-gray-800 rounded-t-2xl border border-gray-200 dark:border-gray-700 p-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              {/* Language Selector */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Code className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Language:
                  </span>
                </div>
                <select
                  value={selectedLanguage}
                  onChange={(e) => handleLanguageChange(e.target.value)}
                  className="px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  {languages.map((lang) => (
                    <option key={lang.id} value={lang.id}>
                      {lang.name} ({lang.version})
                    </option>
                  ))}
                </select>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={runCode}
                  disabled={isRunning}
                  className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-500 text-white font-medium rounded-lg hover:shadow-lg hover:shadow-green-500/25 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isRunning ? (
                    <Loader className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Play className="mr-2 h-4 w-4" />
                  )}
                  {isRunning ? "Running..." : "Run Code"}
                </button>

                <button
                  onClick={downloadCode}
                  className="p-2 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                  title="Download Code"
                >
                  <Download className="h-5 w-5" />
                </button>

                <button
                  onClick={shareCode}
                  className="p-2 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                  title="Share Code"
                >
                  <Share2 className="h-5 w-5" />
                </button>

                <select
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                  className="px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900  dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  title="Editor Theme"
                >
                  <option value="vs-dark">Dark Theme</option>
                  <option value="light">Light Theme</option>
                  <option value="hc-black">High Contrast</option>
                </select>
              </div>
            </div>
          </div>

          {/* Editor and Output Layout */}
          <div className="grid lg:grid-cols-3 gap-0 bg-white dark:bg-gray-800 border-x border-gray-200 dark:border-gray-700">
            {/* Code Editor */}
            <div className="lg:col-span-2 border-r border-gray-200 dark:border-gray-700">
              <div className="bg-gray-50 dark:bg-gray-700 px-4 py-2 border-b border-gray-200 dark:border-gray-600">
                <div className="flex items-center space-x-2">
                  <FileText className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    main.{getCurrentLanguage().extension}
                  </span>
                </div>
              </div>
              <div className="h-96 lg:h-[600px] relative">
                {!isEditorReady && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
                    <div className="text-center">
                      <Loader className="h-8 w-8 animate-spin text-indigo-600 mx-auto mb-2" />
                      <p className="text-gray-600 dark:text-gray-400">
                        Loading editor...
                      </p>
                    </div>
                  </div>
                )}
                <Editor
                  height="100%"
                  language={getCurrentLanguage().monacoLanguage}
                  value={code}
                  onChange={(value) => setCode(value || "")}
                  onMount={handleEditorDidMount}
                  theme={theme}
                  loading={
                    <div className="flex items-center justify-center h-full">
                      <div className="text-center">
                        <Loader className="h-8 w-8 animate-spin text-indigo-600 mx-auto mb-2" />
                        <p className="text-gray-600 dark:text-gray-400">
                          Loading Monaco Editor...
                        </p>
                      </div>
                    </div>
                  }
                  options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    lineNumbers: "on",
                    roundedSelection: false,
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                    tabSize: 2,
                    wordWrap: "on",
                    suggestOnTriggerCharacters: true,
                    quickSuggestions: true,
                    parameterHints: { enabled: true },
                    autoIndent: "full",
                    formatOnPaste: true,
                    formatOnType: true,
                  }}
                />
              </div>
            </div>

            {/* Input and Output Panel */}
            <div className="flex flex-col">
              {/* Input Section */}
              <div className="flex-1 border-b border-gray-200 dark:border-gray-600">
                <div className="bg-gray-50 dark:bg-gray-700 px-4 py-2 border-b border-gray-200 dark:border-gray-600">
                  <div className="flex items-center space-x-2">
                    <Terminal className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Input
                    </span>
                  </div>
                </div>
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Enter input for your program (if needed)..."
                  className="w-full h-32 p-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-none outline-none resize-none font-mono text-sm"
                />
              </div>

              {/* Output Section */}
              <div className="flex-1">
                <div className="bg-gray-50 dark:bg-gray-700 px-4 py-2 border-b border-gray-200 dark:border-gray-600">
                  <div className="flex items-center space-x-2">
                    <Terminal className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Output
                    </span>
                  </div>
                </div>
                <div
                  className={`h-64 lg:h-[400px] p-4 bg-gray-900 ${
                    output?.includes("Errors:")
                      ? "text-red-400"
                      : "text-green-400"
                  } font-mono text-sm overflow-auto`}
                >
                  <pre className="whitespace-pre-wrap">
                    {output || 'Click "Run Code" to see output here...'}
                  </pre>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-b-2xl border border-t-0 border-gray-200 dark:border-gray-700 p-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center space-x-4">
                <span>Powered by Piston API</span>
                <span>•</span>
                <span>Supports {languages.length} languages</span>
              </div>
              <div className="flex items-center space-x-4">
                <span>Keyboard shortcuts: Ctrl+Enter to run</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Language Grid */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Supported Languages
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Choose from {languages.length} programming languages with full
              input/output support
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {languages.map((language) => (
              <button
                key={language.id}
                onClick={() => handleLanguageChange(language.id)}
                className={`p-4 rounded-xl border-2 transition-all duration-200 text-center group ${
                  selectedLanguage === language.id
                    ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20"
                    : "border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-600"
                }`}
              >
                <div className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                  {language.name}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {language.version}
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Playground Features
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Everything you need for coding, testing, and learning
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Code,
                title: "Multiple Languages",
                description: `Support for ${languages.length} programming languages with full syntax highlighting and IntelliSense.`,
              },
              {
                icon: Play,
                title: "Instant Execution",
                description:
                  "Run your code instantly with our fast and reliable execution engine powered by Piston API.",
              },
              {
                icon: Terminal,
                title: "Input/Output",
                description:
                  "Test your programs with custom input and see real-time output with error handling.",
              },
              {
                icon: Settings,
                title: "Customizable",
                description:
                  "Choose your preferred theme, editor settings, and keyboard shortcuts for optimal coding experience.",
              },
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};
