import type { MediaImage } from "@/types/content";

/**
 * Image library. Every image is labelled by kind. Location images are
 * third-party photographs licensed CC BY-SA; the credit is rendered with the image.
 * No image on the site depicts an Ample project unless its kind says so.
 */
export const media = {
  begnasLake: {
    src: "/images/location/begnas-lake-pokhara.jpg",
    alt: "Begnas Lake in the Lekhnath area of Pokhara, with forested hills reflected in still water",
    width: 2400,
    height: 1600,
    kind: "Location Image",
    credit: "Shadow Ayush, CC BY-SA 4.0, via Wikimedia Commons",
    creditUrl: "https://commons.wikimedia.org/wiki/File:Begnas_Lake,_Pokhara,_Kaski.jpg",
  },
  annapurna: {
    src: "/images/location/annapurna-sanctuary-panorama.jpg",
    alt: "Panorama of the Annapurna massif from the Annapurna Sanctuary trail",
    width: 2400,
    height: 854,
    kind: "Location Image",
    credit: "Bijay Chaurasia, CC BY-SA 4.0, via Wikimedia Commons",
    creditUrl: "https://commons.wikimedia.org/wiki/File:Annapurna_Massif-IMG_5221-Pano.jpg",
  },
  kaliGandaki: {
    src: "/images/location/kali-gandaki-a-hydropower-reservoir.jpg",
    alt: "Reservoir of the Kali Gandaki A hydropower station, a green river between steep hillsides",
    width: 2400,
    height: 1800,
    kind: "Location Image",
    credit: "Bhumbdr, CC BY-SA 4.0, via Wikimedia Commons",
    creditUrl: "https://commons.wikimedia.org/wiki/File:Kaligandaki_A_Hydroelectric_Power_Station_Dam01.jpg",
  },
  /** The project's design concept, approved by the client. Not a photograph. */
  cozyHomesConcept: {
    /** Design concept for Pokhara Cozy Homes, confirmed again by the client on 2 Oct 2026 (replaces the 3D render). */
    src: "/images/projects/ample-cozy-homes-concept.jpg",
    alt: "Design concept for Ample Cozy Homes: modern two-storey homes with stone and white walls along a landscaped street, with a lake and the Annapurna range behind",
    width: 1672,
    height: 941,
    kind: "Concept Image",
  },
  /** Design concept for the Lakeside hotel development, supplied by the client (2 Oct 2026). Not a photograph. */
  lakesideHotelConcept: {
    src: "/images/projects/lakeside-hotel-concept.jpg",
    alt: "Design concept for the Lakeside hotel development in Pokhara: a multi-storey hotel with a stone and timber facade, planted balconies and a rooftop terrace, with a lake and hills behind",
    width: 1536,
    height: 1024,
    kind: "Concept Image",
  },
  /**
   * Himalayan Solar Power site, Sitalpati, Khandbari, supplied by the client (2 Oct 2026).
   * A real site photograph the client edited with AI tools; shown with the neutral "Project Image" tag.
   */
  himalayanSolarSite: {
    src: "/images/projects/himalayan-solar-power-site.jpg",
    alt: "Himalayan Solar Power: rows of solar panels on terraced ground with a control building and substation, beside a river valley with snow-capped Himalayan peaks behind",
    width: 1672,
    height: 941,
    kind: "Project Image",
  },
} satisfies Record<string, MediaImage>;
