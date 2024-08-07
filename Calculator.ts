



interface IOrder {
    color: string
    amount: number
    totalPrice?: number
}


class Calculator {
    private colors: string[]
    private specialColors: string[]
    private menu: { [key: string]: number };
    private specialDiscount: boolean
    constructor() {
        //init price and color on menu
        this.menu = {
            "RED": 50,
            "GREEN": 40,
            "BLUE": 30,
            "YELLOW": 50,
            "PINK": 80,
            "PURPLE": 90,
            "ORANGE": 120
        }
        this.specialDiscount = false //init speciaDiscount 
        this.colors = ["RED", "GREEN", "BLUE", "YELLOW", "PINK", "PURPLE", "ORANGE"] //init available colors to order
        this.specialColors = ["ORANGE", "PINK", "GREEN"] //init specific colors for special discount
    }


    order(orders: IOrder[], member: boolean) {
        let total = 0
        for (const order of orders) { //loop order input to find total price of each color
            let color = order.color.toUpperCase()
            if (this.colors.includes(color)) {
                const sum = this.sum(color, order.amount)
                total += sum
            }
            if (this.specialColors.includes(color) && order.amount >= 2) { //check orders has color which found specific color for special discount
                this.specialDiscount = true
            }

        }
        total = this.discount(total, this.specialDiscount, member)
        return total
    }


    sum(color: string, amount: number): number { // check amount of each order and multiple by each price
        let result = 0
        result = this.menu[color] * amount
        return result
    }


    discount(totalAmount: number, specialDiscount: boolean, member: boolean) {
        let discount = 0
        if (member) { //if user has member discount 10%
            discount = totalAmount * 0.10
            totalAmount -= discount
        }
        if (specialDiscount) { // if orders match on specfic colors discount 5%
            discount = totalAmount * 0.05
            totalAmount -= discount
        }
        return totalAmount // return price after discount
    }
}

//case1: normal
const calculator = new Calculator();
const order1 = [
    { color: "red", amount: 1 },
    { color: "green", amount: 1 },
];
console.log("case1: normal");
console.log(order1);
const result1 = calculator.order(order1, false);
if (result1 == 90) {
    console.log("result: Pass => " + result1 + "\n");
} else {
    console.log("result:Failed => Expected 90\n ");
}
//case2: member discount
const calculator2 = new Calculator();
const order2 = [
    { color: "red", amount: 1 },
    { color: "green", amount: 1 },
];
const result2 = calculator2.order(order2, true);
console.log("case2: memeber discount");
console.log(order2);
if (result2 == 81) {
    console.log("result: Pass => " + result2 + "\n");
} else {
    console.log("result:Failed => Expected 81\n ");
}

//case3: special discount
const calculator3 = new Calculator();
const order3 = [
    { color: "orange", amount: 2 },
    { color: "pink", amount: 2 },
    { color: "green", amount: 2 },
];
const result3 = calculator3.order(order3, false);
console.log("case3: special discount");
console.log(order3);
if (result3 == 456) {
    console.log("result: Pass => " + result3 + "\n");
} else {
    console.log("result:Failed => Expected 456\n ");
}
//case4: member and special discount
const calculator4 = new Calculator();
const order4 = [
    { color: "orange", amount: 2 },
    { color: "pink", amount: 2 },
    { color: "green", amount: 2 },
];
const result4 = calculator4.order(order4, true);
console.log("case4: member and special discount");
console.log(order4);
if (result4 == 410.4) {
    console.log("result: Pass => " + result4 + "\n");
} else {
    console.log("result:Failed => Expected 410.4\n ");
}
