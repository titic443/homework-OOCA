



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
const calculator = new Calculator()
const order1: IOrder[] = [
    { color: "red", amount: 1 },
    { color: "green", amount: 1 }
]
console.log(calculator.order(order1, false))

//case2: member discount
const calculator2 = new Calculator()
const order2: IOrder[] = [
    { color: "red", amount: 1 },
    { color: "green", amount: 1 }
]
console.log(calculator2.order(order2, true))

//case3: special discount
const calculator3 = new Calculator()
const order3: IOrder[] = [
    { color: "orange", amount: 2 },
    { color: "pink", amount: 2 },
    { color: "green", amount: 2 }
]
console.log(calculator3.order(order3, false))

//case4: member and special discount
const calculator4 = new Calculator()
const order4: IOrder[] = [
    { color: "orange", amount: 2 },
    { color: "pink", amount: 2 },
    { color: "green", amount: 2 }
]
console.log(calculator4.order(order4, true))