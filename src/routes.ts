import { index, layout, route, type RouteConfig } from '@react-router/dev/routes'

export default [
  layout('components/layout/Layout.tsx', [
    index('pages/Home/HomePage.tsx'),
    route('shop', 'pages/Shop/ShopPage.tsx'),
    route('product/:slug', 'pages/Product/ProductPage.tsx'),
    route('customize', 'pages/Customize/CustomizePage.tsx'),
    route('members', 'pages/Members/MembersPage.tsx'),
    route('members/:slug', 'pages/MemberDetail/MemberDetailPage.tsx'),
    route('lima-2026', 'pages/Lima2026/Lima2026Page.tsx'),
    route('news', 'pages/News/NewsPage.tsx'),
    route('news/:slug', 'pages/NewsDetail/NewsDetailPage.tsx'),
    route('wishlist', 'pages/Wishlist/WishlistPage.tsx'),
    route('cart', 'pages/Cart/CartPage.tsx'),
    route('checkout', 'pages/Checkout/CheckoutPage.tsx'),
    route('about', 'pages/About/AboutPage.tsx'),
    route('*', 'pages/NotFound/NotFoundPage.tsx'),
  ]),
] satisfies RouteConfig
