export interface ReviewModel {
    username: string
    rating: number
    comment: string
    date: string
}

export interface PlantModel {
    id: number
    name: string
    category: string
    targetGroup: string
    productionDate: string
    price: number
    description: string
    image: string
    reviews: ReviewModel[]
}