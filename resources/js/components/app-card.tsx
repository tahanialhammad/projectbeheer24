import { Link } from "@inertiajs/react";

type CardProps = {
  image?: string;
  title: string;
  description?: string;
  link?: string;
  footer?: string;
  imageAlt?: string;
  imageHeight?: number;
};


export default function AppCard(
  { image, title, description, link, footer, imageAlt = "", imageHeight = 200 }
: CardProps) {
  return (
    <div className="flex flex-col justify-between h-full bg-white rounded-lg shadow-md overflow-hidden">
      {/* Image (cardImage) */}
      {image && (
        <div className={`relative w-full h-[${imageHeight}px]`}>
          <img
            src={image}
            alt={imageAlt || title}
            className="object-cover rounded-lg w-100 h-64"
          />
        </div>
      )}

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        {/* Card Header */}
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {link ? <Link href={link} className="hover:text-blue-600">{title}</Link> : title}
        </h3>

        {/* Card Description */}
        {description && (
          <p className="text-sm text-gray-600 line-clamp-3 mb-4">{description}</p>
        )}

        {/* Lees meer link */}
        {link && (
          <Link href={link} className="text-blue-600 underline text-sm mt-auto">
            Read more →
          </Link>
        )}
      </div>

      {/* Card Footer */}
      {footer && (
        <div className="p-5 border-t bg-gray-50 text-sm text-gray-700">
          {footer}
        </div>
      )}
    </div>
  );
}
