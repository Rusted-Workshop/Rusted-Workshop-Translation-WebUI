 "use client"

import { useI18n } from "@/components/i18n-provider"

export const Footer = () => {
  const { t } = useI18n()

  return (
    <footer className="border-t border-zinc-800 bg-zinc-900">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-sm text-zinc-500">
          <p>{t("footer.copyright")}</p>
        </div>
      </div>
    </footer>
  )
}
