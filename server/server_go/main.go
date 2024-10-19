package main

import "fmt"

func main() {
	fmt.Println("Hello world")
	beyondhello()
}

func beyondhello() {
	x := 5
	var y int
	y = 50
	fmt.Println(x)
	sum, multiple := multipleReturn(x, y)
	fmt.Println("sum = ", sum, "multiple = ", multiple)

}
func multipleReturn(x int, y int) (sum int, multiple int) {
	sum = x + y
	multiple = x * y
	return sum, multiple
}
