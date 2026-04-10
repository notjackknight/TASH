/**
 * Square booking integration via direct service URLs.
 *
 * Each service on the website maps to a Square catalog item ID.
 * Clicking "Select" opens the Square booking page for that specific service.
 * Clicking "Book Now" opens the general booking page.
 */

const BOOKING_BASE = 'https://book.squareup.com/appointments/lu0cj345hv4hr2/location/LVZVXGQCTDSJM';

// Map website service titles (lowercase) → Square catalog item IDs
const SERVICE_ID_MAP: Record<string, string> = {
  'the signature haus facial': 'EQHOWXLBUOJOLW3DZP4WM66X',
  'classic haus fill': 'JUDECILCHC6MPZLY7UIU6CC5',
  'brow wax': 'SAYKUPRLNC4VBLOBQKG7HUKI',
  'hydraglow haus facial': 'ETTV4JN6AK35VESGH6GWS4XJ',
  'the dermaplane haus facial': '3ZY7ALQGYG3QMMQIXXIXO3VU',
  'brightening haus facial': 'TPROWVTAIZIZEGMQJAJL2AJ6',
  'acne haus detox facial': '7X26S4PCSB2ZHPBZVWNUW6X2',
  'haus express facial': '223D7DYZVC4LRKWXOBG45O5S',
  'calm haus facial': 'Y7TOZFUMBYKF6OI3TEH4ISRA',
  'timeless haus facial': 'U7D6APTFN7O62BDURZ5K2F7H',
  'haus hydrogen oxygen facial': 'KNGXACYJ4ME6TDR3GAK6DJXS',
  'haus back facial': 'XHXCLU4XQGQCMCOCHU4HTVGT',
  'haus wispy dream fill': '5KEBDL53UWWHA3HXIIVKQVIN',
  'the haus of wispy dreams full set': 'BGHJY7MV4OTC6Y73PWEUP3DL',
  'classic haus full set': 'VWRWBTJE5NMO3ZMUCVPKHG63',
  'signature haus lash lift + tint': 'J5GGVHIWT4BBITA4Y7NS2UXX',
  'the power haus fill': 'MC5XIDIRL3S4RV2RDYD5DDJX',
  'the power house volume full set': 'OHKASGYJVHQDJN6OH24ZNYMU',
  'the haus korean lash lift': 'QVTGFV6ARPB3SLFENDCX62F7',
  'mini haus lash touch up': 'ZO5DX44DH7GEHP7VVBGCFR66',
  'signature haus lash tint': 'E2SZHLTMSLY242RNY247KH3Q',
  'the haus lash removal': 'E3ZOWMSDIZZ3YAA7UYMIUEZJ',
  'brow code brow tint': '5RS3CVMFLEH3OWZYQMTQHQK6',
  'signature haus brow lamination': 'DXATBITA37H7BIZ7FWP5CDMF',
  'brow code hybrid brow stain': '7L6SE5WXXJCTKEF4ZUBK335S',
  'haus microneedling treatment': 'SA2EAMUB4UAOBDVT2LQYVKIJ',
  'cosmedix molecular peels': 'WDWISQ6C7IRCMGNK7KVINUWU',
  'the haus of led therapy': 'HMDDWN4SKFGQDXQ4FJFYACFG',
  'haus scalp treatment and massage': 'CSTCGZYSOR5ND5ICTT4T64JR',
  'haus of hydrated lip mask': 'NWYCOO7LPMJM2NLA62QI46HN',
  'haus lip wax': 'VIL7CKVYIRTJG3EBEUVCES7Y',
  'haus face wax': 'R65RGCKUYCJ2ZMDKCR6KTAX7',
  'the haus underarm wax': 'AVMGUJB7RNSVVJWAQPXZJGVQ',
  'the haus full leg wax': '5V7OQRYVQ33HXERIU3JQ5J4H',
  'haus half leg wax': 'IF73WKDIH4OUZJDAKTA6FXDA',
  'the haus full arm wax': 'ZPH5V5SJJOI25ICAR5PKSGJ4',
  'haus stomach wax': 'QTM5OXMZDODU24ZGJT3YK2Q4',
  'the haus spray tan': 'AWHB5P3EXD5KMBX5UC3UPPDH',
  'pearly white haus teeth whitening': '5TZJZTKCHDADJ4MO4T7AVTIA',
  'haus of gems': 'NESA7DNU7ARGLY6EWI2UYE7R',
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
