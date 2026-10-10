"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Bath, BedDouble, Building2, Compass, FileText, Layers, MapPin, Phone, Route, Sofa } from "lucide-react";
import type { Property } from "@/api/models/property";
import type { File as MediaFile } from "@/api/models/file";
import { usePostApiV10PropertyIdInquiry } from "@/api/endpoints/property";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import baseConfig from "@/configs/base";
import { priceTab, propertyPrice } from "@/lib/property-display";
type Group = { value: string; name: string; link: string; description: string };
const src = (file: MediaFile, original = false) => {
  const compressed = file.compress_info?.desktop;
  const path =
    original || typeof compressed !== "string" ? file.path || "" : compressed;
  return path.startsWith("/") ? `${baseConfig.backendDomain}${path}` : path;
};
function PropertyImage({
  file,
  alt,
  sizes,
  className,
}: {
  file: MediaFile;
  alt: string;
  sizes: string;
  className: string;
}) {
  const [useOriginal, setUseOriginal] = useState(false);
  const [failed, setFailed] = useState(false);
  return (
    <Image
      src={failed ? "/seo.png" : src(file, useOriginal)}
      alt={alt}
      fill
      sizes={sizes}
      className={className}
      unoptimized
      crossOrigin="anonymous"
      onError={() => {
        if (!useOriginal && src(file) !== src(file, true)) setUseOriginal(true);
        else setFailed(true);
      }}
    />
  );
}
const empty = (
  <p className="leading-7 text-gray-600">Nội dung đang được cập nhật.</p>
);
const text = (value?: string | null) =>
  value ? (
    <p className="whitespace-pre-wrap break-words leading-8 text-gray-700">
      {value}
    </p>
  ) : (
    empty
  );
export default function MarketplaceView({
  groups,
  group,
  products,
  property,
  total,
  page,
  loadError = false,
}: {
  groups: Group[];
  group: Group;
  products: Property[];
  property?: Property;
  total: number;
  page: number;
  loadError?: boolean;
}) {
  const [kind, setKind] = useState<"ORDER" | "MESSAGE" | null>(null);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("description");
  const inquiry = usePostApiV10PropertyIdInquiry();
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!property?.id || !kind) return;
    setError("");
    const data = new FormData(event.currentTarget);
    const phone = String(data.get("phone_number")).trim();
    if (!/^[0-9+\-\s()]+$/.test(phone) || phone.replace(/\D/g, "").length < 8) {
      setError("Số điện thoại cần ít nhất 8 chữ số.");
      return;
    }
    try {
      await inquiry.mutateAsync({
        id: property.id,
        data: {
          name: String(data.get("name")).trim(),
          phone_number: String(data.get("phone_number")).trim(),
          content: String(data.get("content")).trim(),
          kind,
        },
      });
      setSuccess(true);
    } catch {
      setError("Chưa gửi được yêu cầu. Kiểm tra số điện thoại và thử lại.");
    }
  }
  const architecture = property
    ? [
        { label: "Loại bất động sản", value: property.category, icon: Building2 },
        { label: "Mặt tiền đường", value: property.street_frontage, icon: Route },
        { label: "Hướng nhà", value: property.direction, icon: Compass },
        { label: "Phòng khách", value: property.living_rooms, icon: Sofa },
        { label: "Số tầng", value: property.floors, icon: Layers },
        { label: "Phòng ngủ", value: property.bedrooms, icon: BedDouble },
        { label: "Phòng vệ sinh", value: property.toilets, icon: Bath },
        { label: "Pháp lý", value: property.legal, icon: FileText },
      ]
    : [];
  const panels = property
    ? [
        {
          value: "description",
          label: "Mô tả / Vị trí",
          content: (
            <>
              {property.location && (
                <p className="mb-4 font-medium">Vị trí: {property.location}</p>
              )}
              {text(property.description)}
            </>
          ),
        },
        {
          value: "architecture",
          label: "Kiến trúc",
          content: (
            <>
              {architecture.length > 0 && (
                <dl className="mb-5 grid gap-x-10 sm:grid-cols-2" aria-label="Kiến trúc và tiện ích">
                  {architecture.map(({ label, value, icon: Icon }) => (
                    <div key={label} className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] items-start gap-4 border-b border-dashed border-gray-200 py-4">
                      <dt className="flex items-start gap-3 text-gray-600">
                        <Icon className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                        <span>{label}</span>
                      </dt>
                      <dd className="whitespace-pre-wrap break-words font-semibold">{value ?? ""}</dd>
                    </div>
                  ))}
                </dl>
              )}
              {property.architecture ? text(property.architecture) : null}
            </>
          ),
        },
        { value: "legal", label: "Pháp lý", content: text(property.legal) },
        {
          value: "media",
          label: "Hình ảnh / video",
          content: property.media?.length ? (
            <div className="grid gap-5 sm:grid-cols-2">
              {property.media.map((file) =>
                file.mime?.startsWith("video/") ? (
                  <video
                    key={file.id}
                    controls
                    preload="metadata"
                    crossOrigin="anonymous"
                    className="aspect-[4/3] w-full rounded-lg bg-black object-contain"
                    aria-label={`Video ${property.title}`}
                    src={
                      file.path?.startsWith("/")
                        ? `${baseConfig.backendDomain}${file.path}`
                        : file.path
                    }
                  />
                ) : (
                  <div
                    key={file.id}
                    className="relative aspect-[4/3] overflow-hidden rounded-lg bg-gray-100"
                  >
                    <PropertyImage
                      file={file}
                      alt={file.title || property.title || "Ảnh sản phẩm"}
                      sizes="(max-width:640px) 100vw, 550px"
                      className="object-cover"
                    />
                  </div>
                ),
              )}
            </div>
          ) : (
            empty
          ),
        },
        {
          value: "analysis",
          label: "Phân tích / xác thực",
          content: text(property.analysis),
        },
        {
          value: "price",
          label: priceTab(property.transaction_group),
          content: (
            <p className="text-xl font-semibold">{propertyPrice(property)}</p>
          ),
        },
      ]
    : [];
  return (
    <main
      data-marketplace-page
      className="min-h-screen bg-gray-50 text-gray-900"
    >
      <section className="bg-gradient-to-br from-red-700 to-red-900 text-white">
        <div className="mx-auto max-w-7xl px-6 py-12 md:py-16">
          <nav
            aria-label="Đường dẫn"
            className="mb-6 flex flex-wrap gap-3 text-sm"
          >
            <Link
              className="inline-flex min-h-11 items-center hover:underline"
              href="/"
            >
              Trang chủ
            </Link>
            <span aria-hidden="true" className="py-3">
              /
            </span>
            <Link
              className="inline-flex min-h-11 items-center hover:underline"
              href="/san-giao-dich"
            >
              Sàn giao dịch và dự án
            </Link>
          </nav>
          <h1 className="max-w-4xl text-3xl font-extrabold leading-tight text-white md:text-5xl">
            {property?.title || "Sàn giao dịch và dự án"}
          </h1>
          {!property && (
            <p className="mt-5 max-w-3xl text-lg leading-8">
              Các bất động sản và dự án do Kepler quản lý, phân phối và kết nối
              đầu tư.
            </p>
          )}
        </div>
      </section>
      <div className="mx-auto max-w-7xl px-6 py-8 md:py-12">
        <nav
          data-marketplace-groups
          aria-label="Nhóm sản phẩm"
          className="grid gap-2 sm:grid-cols-2 lg:grid-cols-5"
        >
          {groups.map((item) => (
            <Link
              key={item.value}
              href={item.link}
              aria-current={item.value === group.value ? "page" : undefined}
              className={`flex min-h-14 items-center justify-center rounded-lg border px-4 py-3 text-center font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary ${item.value === group.value ? "border-primary bg-primary text-white" : "border-gray-200 bg-white text-gray-700 hover:border-primary"}`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
        {property ? (
          <article
            data-marketplace-detail
            className="mt-8 rounded-xl border bg-white p-5 md:p-8"
          >
            <Link
              href={group.link}
              className="inline-flex min-h-11 items-center font-semibold text-primary hover:underline"
            >
              ← Về {group.name}
            </Link>
              <div className="mt-6 flex flex-wrap items-center gap-3" aria-label="Tương tác về sản phẩm">
                {property.phone_sale ? (
                  <a
                    className="inline-flex min-h-11 items-center gap-2 rounded-md border px-4 font-semibold text-primary"
                    href={`tel:${property.phone_sale.replace(/[^+0-9]/g, "")}`}
                  >
                    <Phone className="h-4 w-4" aria-hidden="true" />
                    Liên hệ sale · {property.phone_sale}
                  </a>
                ) : (
                  <p className="py-3 text-gray-600">
                    Kepler đang cập nhật số sale phụ trách.
                  </p>
                )}
                <Button
                  className="min-h-11"
                  onClick={() => {
                    setActiveTab("contact");
                    setKind("ORDER");
                    setSuccess(false);
                    setError("");
                  }}
                >
                  Đặt hàng
                </Button>
                <Button
                  variant="outline"
                  className="min-h-11"
                  onClick={() => {
                    setActiveTab("contact");
                    setKind("MESSAGE");
                    setSuccess(false);
                    setError("");
                  }}
                >
                  Để lại lời nhắn
                </Button>
              </div>
            <Tabs key={property.id} value={activeTab} onValueChange={(value) => {
              setActiveTab(value);
              if (value === "contact" && !kind) setKind("MESSAGE");
            }} className="mt-6">

              <TabsList
                aria-label="Thông tin sản phẩm"
                className="grid h-auto grid-cols-2 gap-2 bg-gray-100 p-2 sm:grid-cols-3 lg:grid-cols-7"
              >
                {panels.map((panel) => (
                  <TabsTrigger
                    key={panel.value}
                    value={panel.value}
                    className="min-h-12 whitespace-normal py-3 leading-6 data-[state=active]:bg-primary data-[state=active]:text-white"
                  >
                    {panel.label}
                  </TabsTrigger>
                ))}
                <TabsTrigger value="contact" className="min-h-12 whitespace-normal py-3 leading-6 data-[state=active]:bg-primary data-[state=active]:text-white">
                  Liên hệ sale
                </TabsTrigger>
              </TabsList>
              {panels.map((panel) => (
                <TabsContent
                  key={panel.value}
                  value={panel.value}
                  className="mt-6 min-h-48 rounded-lg border p-5 md:p-6"
                >
                  <h2 className="mb-5 text-2xl font-bold">
                    {panel.value === "architecture" ? "Kiến trúc – Tiện ích" : panel.label}
                  </h2>
                  {panel.content}
                </TabsContent>
              ))}
              <TabsContent value="contact" className="mt-6 min-h-48 rounded-lg border p-5 md:p-6">
            <section
              aria-label="Liên hệ về sản phẩm"
            >
              <h2 className="text-2xl font-bold">Liên hệ sale</h2>
              <p className="mt-3 leading-7 text-gray-600">Gọi số người phụ trách hoặc gửi lời nhắn, yêu cầu đặt hàng về sản phẩm này.</p>
              {kind && (
                <div className="mt-6 rounded-lg border bg-gray-50 p-5">
                  <h3 className="text-lg font-semibold">
                    {kind === "ORDER"
                      ? "Gửi yêu cầu đặt hàng"
                      : "Để lại lời nhắn"}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-gray-600">
                    {kind === "ORDER"
                      ? "Gửi thông tin để Kepler liên hệ xác nhận nhu cầu. Bạn chưa cần thanh toán."
                      : "Kepler sẽ nhận lời nhắn và liên hệ lại với bạn."}
                  </p>
                  {success ? (
                    <p
                      role="status"
                      className="mt-4 font-medium text-green-800"
                    >
                      Đã gửi yêu cầu về {property.title}. Kepler sẽ liên hệ lại
                      với bạn.
                    </p>
                  ) : (
                    <form onSubmit={submit} className="mt-4 space-y-4">
                      {error && (
                        <p role="alert" className="text-red-800">
                          {error}
                        </p>
                      )}
                      <div className="grid gap-4 sm:grid-cols-2">
                        <label className="space-y-2 font-medium">
                          Họ tên *
                          <Input
                            name="name"
                            autoComplete="name"
                            required
                            maxLength={255}
                            className="min-h-11"
                          />
                        </label>
                        <label className="space-y-2 font-medium">
                          Số điện thoại *
                          <Input
                            name="phone_number"
                            type="tel"
                            autoComplete="tel"
                            required
                            minLength={8}
                            maxLength={20}
                            className="min-h-11"
                          />
                        </label>
                      </div>
                      <label className="block space-y-2 font-medium">
                        Nội dung
                        <Textarea name="content" maxLength={5000} rows={4} />
                      </label>
                      <div className="flex gap-3">
                        <Button
                          disabled={inquiry.isPending}
                          type="submit"
                          className="min-h-11"
                        >
                          {inquiry.isPending ? "Đang gửi…" : "Gửi yêu cầu"}
                        </Button>
                        <Button
                          disabled={inquiry.isPending}
                          type="button"
                          variant="outline"
                          onClick={() => setKind(null)}
                        >
                          Hủy
                        </Button>
                      </div>
                    </form>
                  )}
                </div>
              )}
            </section>
              </TabsContent>
            </Tabs>
          </article>
        ) : (
          <section className="mt-8" aria-label={`Sản phẩm ${group.name}`}>
            <h2 className="text-2xl font-bold md:text-3xl">{group.name}</h2>
            {group.description && (
              <p className="mt-4 max-w-4xl whitespace-pre-wrap leading-8 text-gray-700">
                {group.description}
              </p>
            )}
            {loadError ? (
              <div role="alert" className="mt-6 rounded border bg-white p-6">
                Chưa tải được sản phẩm.{" "}
                <Link
                  href={group.link}
                  className="font-semibold text-primary underline"
                >
                  Thử lại
                </Link>
              </div>
            ) : products.length ? (
              <>
                <p className="mt-5 text-sm text-gray-600">
                  {total} sản phẩm / dự án
                </p>
                <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {products.map((product) => {
                    const image = product.media?.find((file) =>
                      file.mime?.startsWith("image/"),
                    );
                    return (
                      <Link
                        data-marketplace-card
                        key={product.id}
                        href={`/san-giao-dich/san-pham/${product.id}`}
                        className="group min-w-0 overflow-hidden rounded-xl border bg-white hover:border-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
                      >
                        <div className="relative aspect-[4/3] bg-gray-100">
                          {image ? (
                            <PropertyImage
                              file={image}
                              alt={product.title || "Sản phẩm"}
                              sizes="(max-width:640px) 100vw, 400px"
                              className="object-cover"

                            />
                          ) : (
                            <Building2
                              aria-hidden="true"
                              className="absolute inset-0 m-auto h-12 w-12 text-gray-400"
                            />
                          )}
                        </div>
                        <div className="p-5">
                          <p className="text-sm font-semibold text-primary">
                            {product.category || group.name}
                          </p>
                          <h3 className="mt-3 text-xl font-bold leading-7">
                            {product.title}
                          </h3>
                          {product.location && (
                            <p className="mt-3 flex gap-2 leading-7 text-gray-600">
                              <MapPin
                                aria-hidden="true"
                                className="mt-1 h-4 w-4 shrink-0"
                              />
                              {product.location}
                            </p>
                          )}
                          <p className="mt-4 font-semibold text-primary">
                            {propertyPrice(product)}
                          </p>
                          <span className="mt-5 inline-block font-semibold">
                            Xem sản phẩm →
                          </span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
                <nav
                  className="mt-8 flex items-center justify-center gap-5"
                  aria-label="Trang sản phẩm"
                >
                  {page > 1 && (
                    <Link
                      className="inline-flex min-h-11 items-center text-primary underline"
                      href={`${group.link}?page=${page - 1}`}
                    >
                      Trang trước
                    </Link>
                  )}
                  <span>Trang {page}</span>
                  {page * 12 < total && (
                    <Link
                      className="inline-flex min-h-11 items-center text-primary underline"
                      href={`${group.link}?page=${page + 1}`}
                    >
                      Trang tiếp
                    </Link>
                  )}
                </nav>
              </>
            ) : (
              <p className="mt-6 rounded-lg border bg-white p-6 leading-7 text-gray-600">
                Chưa có sản phẩm trong nhóm này. Kepler đang cập nhật thông tin.
              </p>
            )}
          </section>
        )}
      </div>
    </main>
  );
}
