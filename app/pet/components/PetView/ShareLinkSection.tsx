import { memo, useState, useEffect } from "react";
import { ClipboardIcon } from "@heroicons/react/24/outline";

type ViewProps = {
  shareLink: string | null;
  createShareLink: () => void;
};

export const ShareLinkSectionView = ({
  shareLink,
  createShareLink,
}: ViewProps) => {
  const [origin, setOrigin] = useState("");

  // Run only on client
  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  return (
    <section>
      {shareLink ? (
        <>
          <h3 className="mb-2 text-lg font-semibold">Share Link</h3>
          <div className="mt-2 flex items-center gap-2">
            <button
              onClick={() =>
                navigator.clipboard.writeText(origin + `/pet/share/${shareLink}`)
              }
              className="p-2 rounded border hover:bg-gray-100 transition"
              title="Copy link"
              aria-label="Copy share link"
            >
              <ClipboardIcon className="h-5 w-5 text-gray-600" />
            </button>

            <input
              type="text"
              readOnly
              value={origin ? origin + `/pet/share/${shareLink}` : ""}
              className="flex-1 border rounded px-2 py-1 text-sm"
            />
          </div>
        </>
      ) : (
        <button className="px-3 py-1 border rounded" onClick={createShareLink}>
          Generate Share Link
        </button>
      )}
    </section>
  );
};


type Props = {
  petId: string;
  shareLink?: string | null;
};

const ShareLinkSectionBase = ({ petId, shareLink }: Props) => {
  const [shareUrl, setShareUrl] = useState<string | null>(shareLink || null);

  const createShareLink = async () => {
    const res = await fetch(`/api/pet/${petId}/share`, { method: "POST" });
    const data = await res.json();
    if (res.ok) setShareUrl(data.shareUrl);
    else alert(data.error);
  };

  return (
    <ShareLinkSectionView
      shareLink={shareUrl}
      createShareLink={createShareLink}
    />
  );
};

export const ShareLinkSection = memo(ShareLinkSectionBase);
