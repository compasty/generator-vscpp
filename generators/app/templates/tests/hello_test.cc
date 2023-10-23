#include "gtest/gtest.h"
#include "hello.h"

TEST(hello_test, swap_test)
{
    int a1 = 1, a2 = 2;
    swap(a1, a2);
    EXPECT_EQ(a1, 2);
}