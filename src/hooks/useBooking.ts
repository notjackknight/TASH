/**
 * Square booking integration via direct service URLs.
 *
 * Each service on the website maps to a Square catalog item ID.
 * Clicking "Select" opens the Square booking page for that specific service.
 * Clicking "Book Now" opens the general booking page.
 */

const BOOKING_BASE = 'https://book.squareup.com/appointments/lu0cj345hv4hr2/location/LVZVXGQCTDSJM';

// Map website service titles (lowercase) → Square catalog item IDs.
// Keys must match the lowercased `title` field in Services.tsx exactly.
const SERVICE_ID_MAP: Record<string, string> = {
  'the signature tash facial': 'EQHOWXLBUOJOLW3DZP4WM66X',
  'the soft tash fill': 'JUDECILCHC6MPZLY7UIU6CC5',
  'brow wax': 'SAYKUPRLNC4VBLOBQKG7HUKI',
  'the tash hydraglow facial': 'ETTV4JN6AK35VESGH6GWS4XJ',
  'the tash dermaplane facial': '3ZY7ALQGYG3QMMQIXXIXO3VU',
  'the tash brightening facial': 'TPROWVTAIZIZEGMQJAJL2AJ6',
  'the pure tash acne detox facial': '7X26S4PCSB2ZHPBZVWNUW6X2',
  'the tash mini facial': '223D7DYZVC4LRKWXOBG45O5S',
  'the calm tash facial': 'Y7TOZFUMBYKF6OI3TEH4ISRA',
  'the timeless tash facial': 'U7D6APTFN7O62BDURZ5K2F7H',
  'the tash back facial': 'XHXCLU4XQGQCMCOCHU4HTVGT',
  'the soft glam tash fill': '5KEBDL53UWWHA3HXIIVKQVIN',
  'the tash soft glam full set': 'BGHJY7MV4OTC6Y73PWEUP3DL',
  'the soft tash full set': 'VWRWBTJE5NMO3ZMUCVPKHG63',
  'the bold tash volume fill': 'MC5XIDIRL3S4RV2RDYD5DDJX',
  'the bold tash volume full set': 'OHKASGYJVHQDJN6OH24ZNYMU',
  'the tash korean lash lift': 'QVTGFV6ARPB3SLFENDCX62F7',
  'the mini tash lash touch up': 'ZO5DX44DH7GEHP7VVBGCFR66',
  'the signature tash lash tint': 'E2SZHLTMSLY242RNY247KH3Q',
  "tash's signature lash lift": 'CDYA2KCYT3CY7CJBC2YTOFC4',
  'lash removal': 'NKWIDYXDQDO7QHHWSML5YRHM',
  'the tash hydrogen facial': '645CEG5QPFMW3WMYCYMK5PTQ',
  'brow code brow tint': '5RS3CVMFLEH3OWZYQMTQHQK6',
  'the tash brow lamination': '6DRGCGRFPQJIXSBLXHBATJCE',
  'brow code hybrid brow stain': '7L6SE5WXXJCTKEF4ZUBK335S',
  'the tash microneedling treatment': 'SA2EAMUB4UAOBDVT2LQYVKIJ',
  'cosmedix molecular peels': 'WDWISQ6C7IRCMGNK7KVINUWU',
  "tash's led red light facial": 'R2Q2VUB4GN5U77F22FQZLW74',
  'tash scalp treatment and massage': 'CSTCGZYSOR5ND5ICTT4T64JR',
  'the tash hydrated lip mask': 'NWYCOO7LPMJM2NLA62QI46HN',
  'the tash signature lip wax': 'VIL7CKVYIRTJG3EBEUVCES7Y',
  'the tash face wax': 'R65RGCKUYCJ2ZMDKCR6KTAX7',
  'the tash underarm wax': 'AVMGUJB7RNSVVJWAQPXZJGVQ',
  'the tash full leg wax': '5V7OQRYVQ33HXERIU3JQ5J4H',
  'the tash half leg wax': 'IF73WKDIH4OUZJDAKTA6FXDA',
  'the tash full arm wax': 'ZPH5V5SJJOI25ICAR5PKSGJ4',
  'the tash stomach wax': 'QTM5OXMZDODU24ZGJT3YK2Q4',
  'the tash luxury spray tan': 'AWHB5P3EXD5KMBX5UC3UPPDH',
  'the tash pearly white teeth whitening': '5TZJZTKCHDADJ4MO4T7AVTIA',
  "tash's tooth gems": 'NESA7DNU7ARGLY6EWI2UYE7R',
};

/**
 * Open the Square booking page. If a service title is provided,
 * opens directly to that service's page. Otherwise opens the
 * general service list.
 */
export function openBooking(serviceTitle?: string): void {
  let url = `${BOOKING_BASE}/services`;

  if (serviceTitle) {
    const itemId = SERVICE_ID_MAP[serviceTitle.toLowerCase()];
    if (itemId) {
      url = `${BOOKING_BASE}/services/${itemId}`;
    }
  }

  window.open(url, '_blank', 'noopener,noreferrer');
}
