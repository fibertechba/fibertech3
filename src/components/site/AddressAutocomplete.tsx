import { useEffect, useRef, useState } from "react";

/**
 * Campo de endereço com autocomplete do Google Maps (Places).
 * Defina VITE_GOOGLE_MAPS_API_KEY para ativar. Sem a chave, o campo continua
 * funcionando como texto livre.
 */
declare global {
  interface Window {
    google?: any;
    __gmapsPromise?: Promise<void>;
  }
}

const KEY = import.meta.env["VITE_GOOGLE_MAPS_API_KEY"] as string | undefined;

function loadGoogleMaps(): Promise<void> {
  if (typeof window === "undefined" || !KEY) return Promise.reject();
  if (window.google?.maps?.places) return Promise.resolve();
  if (!window.__gmapsPromise) {
    window.__gmapsPromise = new Promise<void>((resolve, reject) => {
      const s = document.createElement("script");
      s.src = `https://maps.googleapis.com/maps/api/js?key=${KEY}&libraries=places&language=pt-BR&region=BR`;
      s.async = true;
      s.onload = () => resolve();
      s.onerror = () => reject();
      document.head.appendChild(s);
    });
  }
  return window.__gmapsPromise;
}

export function AddressAutocomplete({
  id = "endereco",
  name = "endereco",
  value,
  onChange,
  onPlace,
  placeholder = "Digite seu endereço completo",
  required,
  className,
}: {
  id?: string;
  name?: string;
  value: string;
  onChange: (v: string) => void;
  onPlace?: (info: { address: string; cep?: string; mapUrl?: string }) => void;
  placeholder?: string;
  required?: boolean;
  className?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    loadGoogleMaps()
      .then(() => {
        if (cancelled || !inputRef.current || !window.google?.maps?.places) return;
        const ac = new window.google.maps.places.Autocomplete(inputRef.current, {
          componentRestrictions: { country: "br" },
          fields: ["formatted_address", "address_components", "geometry"],
          types: ["address"],
        });
        ac.addListener("place_changed", () => {
          const place = ac.getPlace();
          const address = place?.formatted_address ?? inputRef.current?.value ?? "";
          const cep = place?.address_components?.find((c: any) =>
            c.types?.includes("postal_code"),
          )?.long_name;
          const loc = place?.geometry?.location;
          const mapUrl = loc
            ? `https://www.google.com/maps/search/?api=1&query=${loc.lat()},${loc.lng()}`
            : undefined;
          onChange(address);
          onPlace?.({ address, cep, mapUrl });
        });
        setReady(true);
      })
      .catch(() => setReady(false));
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <input
        ref={inputRef}
        id={id}
        name={name}
        required={required}
        autoComplete="off"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={className}
      />
      {KEY ? (
        <p className="mt-1.5 text-xs text-muted-foreground">
          {ready
            ? "Comece a digitar e selecione o endereço sugerido pelo Google Maps."
            : "Carregando sugestões do Google Maps..."}
        </p>
      ) : null}
    </>
  );
}
