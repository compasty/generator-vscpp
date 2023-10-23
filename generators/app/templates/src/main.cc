#include "hello.h"

#include <iostream>
#include <string>
#include <vector>

int main(int argc, char** argv) {
  std::vector<std::string> msg{"Hello,", "World!"};
  for (const std::string& s : msg) {
    std::cout << s;
  }
  std::cout << std::endl;
  int a1 = 1, a2 = 2;
  swap(a1, a2);
  std::cout << a1 << "\t" << a2 << std::endl;
  return 0;
}