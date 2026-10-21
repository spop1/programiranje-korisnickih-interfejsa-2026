export type OrderStatus = 'rezervisano' | 'pristiglo' | 'otkazano'

export interface OrderModel {
    plantId: number
    status: OrderStatus
    createdAt: string
    arrivedAt: string | null
    canceledAt: string | null
    totalCount: number
    pricePerPlant: number
}