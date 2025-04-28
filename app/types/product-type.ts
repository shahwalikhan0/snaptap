// {
//     "id": 1,
//     "user_id": 1,
//     "brand_id": 1,
//     "name": "Product 1",
//     "description": "Description for Product 1",
//     "price": 100,
//     "category": "Category A",
//     "model_url": "https://snaptap.up.railway.app/model/shah-123",
//     "qr_code_url": "http://example.com/product1.usdz",
//     "image_url": "https://d1lfxha3ugu3d4.cloudfront.net/assets/system-images/made/assets/system-images/remote/https_d1lfxha3ugu3d4.cloudfront.net/exhibitions/images/2015_Sneaker_Culture_1._AJ_1_from_Nike_4000W.jpg_600_400.jpg",
//     "is_active": true,
//     "created_at": "2025-04-25T06:43:35.229671"
//   }
export type ProductType = {
  id: number;
  user_id: number;
  brand_id: number;
  name: string;
  description?: string;
  price?: number;
  category: string;
  model_url: string;
  qr_code_url?: string;
  image_url?: string;
  is_active: boolean;
  created_at: string;
};
