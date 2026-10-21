import type { OrderModel } from "@/models/order.model"
import type { UserModel } from "@/models/user.model"

const USERS_KEY = 'pki_2026_users'
const ACTIVE_USERS_KEY = 'pki_2026_active'

export class UserService {

    static getUsers(): UserModel[] {
        if (localStorage.getItem(USERS_KEY) == null)
            localStorage.setItem(USERS_KEY, JSON.stringify([
                {
                    email: 'user@example.com',
                    password: 'user123',
                    orders: []
                }
            ]))
        return JSON.parse(localStorage.getItem(USERS_KEY)!)
    }

    static getActiveUser(): UserModel | null {
        const isActiveEmail = localStorage.getItem(ACTIVE_USERS_KEY)

        if (!isActiveEmail) return null

        for (let user of this.getUsers()) {
            if (user.email == isActiveEmail) {
                return user
            }

        }
        return null
    }

    static addOrder(order: OrderModel) {
        const activeEmail = localStorage.getItem(ACTIVE_USERS_KEY)

        if (!activeEmail) return

        const users = this.getUsers()
        const activeUsers = users.find(user => user.email === activeEmail)

        if (!activeUsers) return

        activeUsers.orders.push(order)

        localStorage.setItem(USERS_KEY, JSON.stringify(users))
    }

    static login(email: string, password: string): boolean {
        const users = this.getUsers()

        for (let user of users) {
            if (user.email == email && user.password == password) {
                localStorage.setItem(ACTIVE_USERS_KEY, email)
                return true
            }
        }
        return false
    }

    static logout() {
        localStorage.removeItem(ACTIVE_USERS_KEY)
    }


}
