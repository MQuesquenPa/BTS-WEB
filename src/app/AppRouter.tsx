import { lazy, Suspense, type ReactNode } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { RouteFallback } from '@/components/common/RouteFallback'
import { Layout } from '@/components/layout/Layout'

const HomePage = lazy(() => import('@/pages/Home/HomePage'))
const ShopPage = lazy(() => import('@/pages/Shop/ShopPage'))
const ProductPage = lazy(() => import('@/pages/Product/ProductPage'))
const CustomizePage = lazy(() => import('@/pages/Customize/CustomizePage'))
const MembersPage = lazy(() => import('@/pages/Members/MembersPage'))
const MemberDetailPage = lazy(() => import('@/pages/MemberDetail/MemberDetailPage'))
const Lima2026Page = lazy(() => import('@/pages/Lima2026/Lima2026Page'))
const NewsPage = lazy(() => import('@/pages/News/NewsPage'))
const NewsDetailPage = lazy(() => import('@/pages/NewsDetail/NewsDetailPage'))
const WishlistPage = lazy(() => import('@/pages/Wishlist/WishlistPage'))
const CartPage = lazy(() => import('@/pages/Cart/CartPage'))
const CheckoutPage = lazy(() => import('@/pages/Checkout/CheckoutPage'))
const AboutPage = lazy(() => import('@/pages/About/AboutPage'))
const NotFoundPage = lazy(() => import('@/pages/NotFound/NotFoundPage'))

function withSuspense(element: ReactNode) {
  return <Suspense fallback={<RouteFallback />}>{element}</Suspense>
}

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: withSuspense(<HomePage />) },
      { path: '/shop', element: withSuspense(<ShopPage />) },
      { path: '/product/:slug', element: withSuspense(<ProductPage />) },
      { path: '/customize', element: withSuspense(<CustomizePage />) },
      { path: '/members', element: withSuspense(<MembersPage />) },
      { path: '/members/:slug', element: withSuspense(<MemberDetailPage />) },
      { path: '/lima-2026', element: withSuspense(<Lima2026Page />) },
      { path: '/news', element: withSuspense(<NewsPage />) },
      { path: '/news/:slug', element: withSuspense(<NewsDetailPage />) },
      { path: '/wishlist', element: withSuspense(<WishlistPage />) },
      { path: '/cart', element: withSuspense(<CartPage />) },
      { path: '/checkout', element: withSuspense(<CheckoutPage />) },
      { path: '/about', element: withSuspense(<AboutPage />) },
      { path: '*', element: withSuspense(<NotFoundPage />) },
    ],
  },
])
