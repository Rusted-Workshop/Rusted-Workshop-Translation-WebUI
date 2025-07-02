import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Zap, FileText, Shield, Languages, Code, HelpCircle } from "lucide-react"
import Link from "next/link"

export const Header = () => {
  return (
    <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">铁锈工坊</h1>
              <p className="text-sm text-green-600 font-medium">汉化组工具</p>
            </div>
          </Link>

          <div className="flex items-center space-x-4">
            <nav className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-700 hover:text-green-600 hover:bg-green-50"
                asChild
              >
                <Link href="/">
                  <Languages className="h-4 w-4 mr-2" />
                  汉化工具
                </Link>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="text-gray-700 hover:text-gray-600 hover:bg-gray-50"
                asChild
              >
                <Link href="/about">
                  <HelpCircle className="h-4 w-4 mr-2" />
                  关于
                </Link>
              </Button>
            </nav>

            <Badge variant="outline" className="border-green-200 text-green-700">
              Beta
            </Badge>
          </div>
        </div>
      </div>
    </header>
  )
}
