import type { HistoricalDocument } from './types'

export const documents: HistoricalDocument[] = [
  // ============================================
  // TREATY OF HOLSTON
  // ============================================
  {
    slug: 'treaty-of-holston-1791',
    title: 'Treaty of Holston with the Cherokee',
    date: '1791-07-02',
    dateDisplay: 'July 2, 1791',
    category: 'treaties',
    badge: 'Treaty',
    author: 'William Blount (for the United States)',
    keyQuote:
      'There shall be perpetual peace and friendship between all the citizens of the United States of America, and all the individuals composing the whole Cherokee nation of Indians.',
    keyQuoteAttribution: 'Article I, Treaty of Holston',
    whyThisMatters:
      "This treaty was negotiated by Governor William Blount at White's Fort (Knoxville) in July 1791, following preliminary diplomatic meetings at Rocky Mount in December 1790. Signed by 42 Cherokee chiefs and ratified by President Washington, it established boundaries between the United States and Cherokee Nation and shaped the future borders of Tennessee.",
    content: `<p>The treaty was negotiated by William Blount, Governor of the Territory south of the Ohio River, representing the United States, and Cherokee Chiefs and Warriors representing their nation. It aimed to establish permanent peace and remove causes of war through boundary clarification and friendly arrangements.</p>

<h3>Articles of the Treaty</h3>

<p><span class="articleNumber">Article I</span> — Perpetual peace and friendship between all citizens of the United States and all individuals of the Cherokee Nation.</p>

<p><span class="articleNumber">Article II</span> — The Cherokee Nation acknowledges to be under the protection of the United States, and of no other sovereign; prohibited from entering into treaties with foreign powers or individual states.</p>

<p><span class="articleNumber">Article III</span> — Prisoners on both sides to be restored by April 1st at the treaty location.</p>

<p><span class="articleNumber">Article IV</span> — Boundary defined beginning at "the top of the Currahee mountain" extending through multiple geographic points including the Cumberland River. Cherokee ceded lands east of this line in exchange for goods and $1,000 annually. Three persons from each side would mark the boundary.</p>

<p><span class="articleNumber">Article V</span> — Americans granted free passage on road and navigation rights on the Tennessee River.</p>

<p><span class="articleNumber">Article VI</span> — United States granted exclusive trade regulation authority with the Cherokee Nation.</p>

<p><span class="articleNumber">Article VII</span> — The United States solemnly guarantees to the Cherokee nation all their lands not ceded by this treaty.</p>

<p><span class="articleNumber">Article VIII</span> — U.S. citizens illegally settling on Cherokee lands forfeit the protection of the United States.</p>

<p><span class="articleNumber">Article IX</span> — Hunting on Cherokee lands prohibited without passports from the governor.</p>

<p><span class="articleNumber">Article X</span> — Cherokee committing capital crimes against Americans subject to extradition and punishment.</p>

<p><span class="articleNumber">Article XI</span> — U.S. citizens committing crimes in Cherokee territory subject to equivalent punishment as if committed against citizens.</p>

<p><span class="articleNumber">Article XII</span> — Retaliation prohibited without demanding satisfaction first through proper channels.</p>

<p><span class="articleNumber">Article XIII</span> — Cherokee required to notify U.S. of any threats from other tribes or nations.</p>

<p><span class="articleNumber">Article XIV</span> — United States committed to providing agricultural implements and up to four interpreters.</p>

<p><span class="articleNumber">Article XV</span> — All animosities for past grievances ended; commitment to good-faith execution of the treaty.</p>

<p><span class="articleNumber">Article XVI</span> — Treaty effective upon ratification by the President with advice and consent of the Senate.</p>

<h3>Additional Article (February 17, 1792)</h3>

<p>Increased annual payments from $1,000 to $1,500, signed by Secretary of War Henry Knox and six Cherokee representatives in Philadelphia.</p>

<h3>Signatories</h3>

<p>Signed by forty-two Cherokee chiefs and warriors, including Squollecuttah (Hanging Maw), Nenetooyah (Bloody Fellow), Kunoskeskie (John Watts), Chuquilatague (Doublehead), and Enoleh (Black Fox).</p>

<p><strong>Interpreters:</strong> John Thompson and James Carey</p>

<p><strong>United States Representative:</strong> William Blount, Governor of the Territory South of the River Ohio</p>`,
    sources: [
      {
        name: 'Avalon Project, Yale Law School',
        url: 'https://avalon.law.yale.edu/18th_century/chr1791.asp',
      },
      {
        name: 'DigiTreaties (Original Manuscript)',
        url: 'https://digitreaties.org/treaties/treaty/88697242/',
      },
      {
        name: 'Papers of the War Department',
        url: 'https://wardepartmentpapers.org/s/home/item/41698',
      },
    ],
    citation:
      '"Treaty of Holston with the Cherokee, July 2, 1791." Transcribed by Rocky Mount State Historic Site from Avalon Project, Yale Law School. https://tennesseestartshere.com/evidence/documents/treaty-of-holston-1791',
    relatedDocuments: [
      {
        slug: 'washington-proclamation-1791',
        title: "Washington's Proclamation (November 11, 1791)",
      },
      { slug: 'cherokee-treaty-signatories', title: 'Cherokee Treaty Signatories' },
      { slug: 'washington-to-knox-1790', title: 'Washington to Knox (August 13, 1790)' },
    ],
  },

  // ============================================
  // WASHINGTON TO KNOX
  // ============================================
  {
    slug: 'washington-to-knox-1790',
    title: 'George Washington to Henry Knox',
    date: '1790-08-13',
    dateDisplay: 'August 13, 1790',
    category: 'correspondence',
    badge: 'Presidential',
    author: 'George Washington',
    recipient: 'Henry Knox, Secretary of War',
    keyQuote: 'Where ought the Governor to reside?',
    keyQuoteAttribution: 'George Washington to Henry Knox, August 13, 1790',
    whyThisMatters:
      "President Washington posed this question to his Secretary of War in August 1790, just two months after appointing William Blount as Governor of the Southwest Territory. The answer—Rocky Mount, at William Cobb's home—made this site the first seat of federal government west of the Appalachians.",
    content: `<p>In this letter, President Washington requests Secretary of War Knox to prepare matters requiring presidential approval before Washington's departure to Virginia. The letter addresses multiple frontier concerns:</p>

<ul>
  <li>Regulations for trade with Native American nations</li>
  <li>Addressing conflicts arising from territorial expansion</li>
  <li>Western frontier security measures</li>
  <li>A proposed proclamation forbidding encroachments on tribal territories</li>
  <li>Instructions for the territorial governor</li>
  <li>Response to Major Doughty's diplomatic mission attack</li>
  <li>Military post recommendations</li>
  <li>Supply improvements for western posts</li>
  <li>Execution of court-martial sentences</li>
</ul>

<p>The critical question—<em>"Where ought the Governor to reside?"</em>—appears among these concerns, showing that the location of territorial governance was a matter of direct presidential interest.</p>

<h3>Editorial Notes</h3>

<p>According to the editorial notes from Founders Online, Blount was appointed in June 1790 and "was to leave for Tennessee on 24 Aug. 1790." This document shows Washington actively considering where Blount should establish the territorial capital.</p>

<p>The answer would be Rocky Mount, at William Cobb's home in the Holston settlements—chosen for its central location between the Washington and Mero Districts, its proximity to Cherokee territory (important for treaty negotiations), and the quality of Cobb's establishment.</p>`,
    sources: [
      {
        name: 'Founders Online, National Archives',
        url: 'https://founders.archives.gov/documents/Washington/05-06-02-0119',
      },
    ],
    citation:
      '"George Washington to Henry Knox, 13 August 1790." Founders Online, National Archives, The Papers of George Washington, Presidential Series, Vol. 6. https://tennesseestartshere.com/evidence/documents/washington-to-knox-1790',
    relatedDocuments: [
      { slug: 'jefferson-to-blount-1790', title: 'Jefferson to Blount (August 1, 1790)' },
      {
        slug: 'blount-to-jg-blount-1790-10-20',
        title: 'Blount to John Gray Blount (October 20, 1790)',
      },
      { slug: 'treaty-of-holston-1791', title: 'Treaty of Holston (July 2, 1791)' },
    ],
  },

  // ============================================
  // WASHINGTON'S PROCLAMATION
  // ============================================
  {
    slug: 'washington-proclamation-1791',
    title: "Washington's Proclamation on the Treaty of Holston",
    date: '1791-11-11',
    dateDisplay: 'November 11, 1791',
    category: 'proclamations',
    badge: 'Proclamation',
    author: 'George Washington (President)',
    keyQuote:
      'I do hereby enjoin and require all officers of the United States, civil and military, and all citizens and inhabitants thereof, to govern themselves according to the said treaty, as they will answer the contrary at their peril.',
    keyQuoteAttribution: 'George Washington, November 11, 1791',
    whyThisMatters:
      'This proclamation, signed by President Washington and countersigned by Secretary of State Thomas Jefferson, made the Treaty of Holston binding federal law. Every U.S. officer—civil and military—was required to enforce its terms "at their peril." It transformed Blount\'s diplomatic work—planned from Rocky Mount and negotiated at White\'s Fort—into the supreme law of the land.',
    content: `<p>President George Washington's formal proclamation ratifying the Treaty of Holston, negotiated by Governor William Blount with the Cherokee Nation on July 2, 1791. This document made the treaty binding U.S. law and required all federal officers and citizens to comply with its terms.</p>

<h3>Treaty Negotiation Details</h3>

<p>William Blount, territorial governor, concluded negotiations with 41 Cherokee chiefs and two interpreters (John Thompson and James Carey) at the Holston River settlement near present-day Knoxville, Tennessee.</p>

<h3>Principal Treaty Provisions</h3>

<ol>
  <li>Perpetual peace between U.S. citizens and Cherokee Nation</li>
  <li>Cherokee acknowledgment of U.S. protection</li>
  <li>Prisoner exchanges scheduled for April 1, 1792</li>
  <li>Redrawn boundary lines between Cherokee lands and U.S. territory</li>
  <li>Road access from Washington District to Mero District</li>
  <li>Exclusive U.S. trade regulation rights</li>
  <li>Guarantee of Cherokee lands not ceded</li>
  <li>No protection for illegal U.S. settlers on Cherokee lands</li>
  <li>Hunting restrictions requiring passports</li>
  <li>Cherokee extradition for capital crimes</li>
  <li>U.S. citizens subject to equivalent punishment in Cherokee territory</li>
  <li>No retaliation without demanding satisfaction</li>
  <li>Cherokee notification of threats</li>
  <li>U.S. to provide agricultural implements and interpreters</li>
  <li>Past grievances ended</li>
  <li>Treaty effective upon Senate ratification</li>
</ol>

<p><strong>Annual annuity:</strong> $1,000 in trade goods (later increased to $1,500 in February 1792 additional article)</p>

<h3>Historical Context</h3>

<p>This treaty replaced the 1785 Treaty of Hopewell, which all parties found inadequate due to settler encroachment and unresolved territorial disputes following North Carolina's 1789 admission to the Union.</p>

<p>The proclamation was countersigned by Thomas Jefferson as Secretary of State, making it one of the earliest instances of federal treaty law in the new nation.</p>`,
    sources: [
      {
        name: 'Founders Online, National Archives',
        url: 'https://founders.archives.gov/documents/Washington/05-09-02-0100',
      },
      {
        name: 'Papers of the War Department',
        url: 'https://wardepartmentpapers.org/s/home/item/42169',
      },
    ],
    citation:
      '"Washington\'s Proclamation, 11 November 1791." Founders Online, National Archives; Also in Territorial Papers, Vol. 4, page 68. https://tennesseestartshere.com/evidence/documents/washington-proclamation-1791',
    relatedDocuments: [
      { slug: 'treaty-of-holston-1791', title: 'Treaty of Holston (July 2, 1791)' },
      { slug: 'cherokee-treaty-signatories', title: 'Cherokee Treaty Signatories' },
    ],
  },

  // ============================================
  // JEFFERSON TO BLOUNT
  // ============================================
  {
    slug: 'jefferson-to-blount-1790',
    title: 'Thomas Jefferson to William Blount',
    date: '1790-08-01',
    dateDisplay: 'August 1, 1790',
    category: 'correspondence',
    badge: 'Cabinet',
    author: 'Thomas Jefferson, Secretary of State',
    recipient: 'William Blount, Governor, Southwest Territory',
    keyQuote:
      'a very perfect Sense of the Honor... with a firm Determination to perform the duties of it to the best of Abilities',
    keyQuoteAttribution:
      "From Blount's acceptance letter, referenced in Jefferson's correspondence",
    whyThisMatters:
      "Secretary of State Thomas Jefferson sent this letter transmitting Blount's official commission as Governor of the Southwest Territory. It marks the formal beginning of federal governance in what would become Tennessee. Blount had been nominated by Washington on June 7, 1790, and confirmed by the Senate the following day.",
    content: `<p>Jefferson writes from New York to the newly appointed Governor William Blount, enclosing three legislative documents that would govern Blount's administration:</p>

<ul>
  <li>The Northwest Territory Ordinance (1787)</li>
  <li>The Act for Northwest Territory governance (1789)</li>
  <li>The Act for Southwest Territory governance (1790)</li>
</ul>

<p>This letter officially transmitted Blount's governing authority over the territory that would become Tennessee.</p>

<h3>Context</h3>

<p>Jefferson promises to send complete printed copies of Congressional acts once available. He mentions expecting Congress to adjourn that week and notes ongoing negotiations with Creek Nation representatives and Colonel McGillivray regarding potential Spanish-British conflict.</p>

<h3>Blount's Response</h3>

<p>The document references Blount's earlier acceptance letter from July 7, 1790, in which Blount expressed "a very perfect Sense of the Honor" and "a firm Determination to perform the duties of it to the best of Abilities."</p>

<h3>Timeline</h3>

<ul>
  <li><strong>June 7, 1790:</strong> Washington nominates Blount as Governor</li>
  <li><strong>June 8, 1790:</strong> Senate confirms the appointment</li>
  <li><strong>July 7, 1790:</strong> Blount accepts the commission</li>
  <li><strong>August 1, 1790:</strong> Jefferson transmits this letter with governing documents</li>
  <li><strong>September 18, 1790:</strong> Blount visits Washington at Mount Vernon to receive instructions</li>
  <li><strong>September 20, 1790:</strong> Blount sworn in by Supreme Court Justice James Iredell</li>
  <li><strong>October 11, 1790:</strong> Blount arrives at Rocky Mount</li>
  <li><strong>October 20, 1790:</strong> Blount writes the "Glass Windows" letter describing his accommodations</li>
</ul>`,
    sources: [
      {
        name: 'Founders Online, National Archives',
        url: 'https://founders.archives.gov/documents/Jefferson/01-17-02-0062',
      },
    ],
    citation:
      '"Thomas Jefferson to William Blount, 1 August 1790." Founders Online, National Archives. https://tennesseestartshere.com/evidence/documents/jefferson-to-blount-1790',
    relatedDocuments: [
      { slug: 'washington-to-knox-1790', title: 'Washington to Knox (August 13, 1790)' },
      {
        slug: 'blount-to-jg-blount-1790-10-20',
        title: 'Blount to John Gray Blount (October 20, 1790)',
      },
      { slug: 'treaty-of-holston-1791', title: 'Treaty of Holston (July 2, 1791)' },
    ],
  },

  // ============================================
  // BLOUNT TO JOHN GRAY BLOUNT - "GLASS WINDOWS" LETTER
  // ============================================
  {
    slug: 'blount-to-jg-blount-1790-10-20',
    title: 'William Blount to John Gray Blount',
    date: '1790-10-20',
    dateDisplay: 'October 20, 1790',
    location: 'Rocky Mount, Southwest Territory',
    category: 'territorial',
    badge: 'Territorial',
    author: 'William Blount',
    authorTitle: 'Governor, Territory of the United States South of the River Ohio',
    recipient: 'John Gray Blount',
    recipientLocation: 'Washington, North Carolina',
    keyQuote:
      'I am very well accommodated with a Room with Glass Windows, Fire Place &c &c at this place.',
    keyQuoteAttribution: 'William Blount, October 20, 1790',
    excerpts: [
      {
        text: 'On the 11th instant, I arrived in this country, and was received with every mark of attention and gladness that I could have wished.',
        context: 'Arrival and reception — source for October 11, 1790 arrival date',
      },
      {
        text: 'I am very well accommodated with a Room with Glass Windows, Fire Place &c &c at this place.',
        context: 'Accommodations at the Cobb house — material culture evidence',
      },
      {
        text: 'Farrowgood went on as I am informed with the Guard not finding it quite safe to proceed with his Treasure before the profound peace prevails with all the northern Indians.',
        context: 'Security situation — George Farragut and military convoy',
      },
    ],
    whyThisMatters:
      "Written nine days after establishing the territorial capital, this letter captures three dimensions of Rocky Mount in October 1790: the warm reception from settlers weary of the Franklin chaos, the unexpected refinement of the Cobb house with its rare glass windows, and the dangerous conditions beyond its walls—a military convoy carrying government funds stalled because the roads weren't safe. The letter also documents George Farragut, a Minorcan immigrant serving as muster-master, whose son David would become America's first Admiral.",
    content: `<p>This letter from Governor William Blount to his half-brother and business partner John Gray Blount in North Carolina provides the most detailed first-hand account of Rocky Mount as the territorial capital.</p>

<h3>The Arrival (October 11, 1790)</h3>

<p>Blount reports arriving "on the 11th instant" and being "received with every mark of attention and gladness." This warm reception contrasted sharply with the chaos of the recently-collapsed State of Franklin. The settlers welcomed federal authority and the stability it promised.</p>

<h3>The Accommodations</h3>

<p>The famous passage about "Glass Windows" and "Fire Place" reveals the exceptional quality of William Cobb's house. On the frontier, glass windows were a rare luxury—fragile panes had to be transported by packhorse over the Unaka Mountains. The "&c &c" implies additional amenities (desk, rug, fine furnishings) that Blount considered beneath enumeration.</p>

<h3>The Security Situation</h3>

<p>Blount mentions "Farrowgood" (George Farragut) traveling with a military "Guard" and "Treasure"—likely specie for militia pay or land purchases. Farragut found it "not quite safe to proceed" due to resistance from northern Indigenous groups (likely Shawnee or Chickamauga Cherokee factions opposing U.S. expansion into their territories). This reveals the dangerous conditions surrounding the new seat of government and ongoing Indigenous resistance to American territorial claims.</p>

<h3>About George Farragut</h3>

<p>Jorge Farragut Mesquida (1755–1817), anglicized as George Farragut, was a Minorcan immigrant who served in the Revolutionary War. By 1790 he was serving as muster-master of the territorial militia under Blount. His son, David Glasgow Farragut, would become America's first Admiral, famous for "Damn the torpedoes, full speed ahead!" at the Battle of Mobile Bay (1864).</p>

<h3>The Letter's Preservation</h3>

<p>This letter was preserved because it was sent to John Gray Blount, William's half-brother and business partner who managed the family's mercantile operations from Washington, North Carolina. It was filed as part of the Blount brothers' business records, not merely as family correspondence.</p>`,
    sources: [
      {
        name: 'Original Manuscript: State Archives of North Carolina, John Gray Blount Papers, PC.193',
        url: 'https://digital.ncdcr.gov/Documents/Detail/john-gray-blount-1752-1833-papers-1706-1900/372318',
      },
      {
        name: 'Published Transcription: Keith, Alice Barnwell, ed. The John Gray Blount Papers, Vol. II (1790-1795). Raleigh: State Department of Archives and History, 1959. pp. 127-128',
        url: 'https://archive.org/details/johngrayblountpa02blou',
      },
    ],
    citation:
      '"William Blount to John Gray Blount, 20 October 1790." State Archives of North Carolina, John Gray Blount Papers, PC.193. Published in Keith, Alice Barnwell, ed. The John Gray Blount Papers, Vol. II (1790-1795). Raleigh: State Department of Archives and History, 1959. pp. 127-128. https://tennesseestartshere.com/evidence/documents/blount-to-jg-blount-1790-10-20',
    relatedDocuments: [
      { slug: 'jefferson-to-blount-1790', title: 'Jefferson to Blount (August 1, 1790)' },
      { slug: 'washington-to-knox-1790', title: 'Washington to Knox (August 13, 1790)' },
      { slug: 'treaty-of-holston-1791', title: 'Treaty of Holston (July 2, 1791)' },
    ],
    peopleMentioned: ['George Farragut', 'John Seagrove', 'William Cobb', 'Mary Grainger Blount'],
    interpretiveNotes:
      'Blount spells Farragut as "Farrowgood"—phonetic rendering of the Minorcan pronunciation. The "&c &c" implies additional amenities (desk, rug, etc.) that Blount considered beneath enumeration. "Molsey" in the letter refers to Mary Grainger Blount, William\'s wife who remained in North Carolina.',
  },

  // ============================================
  // CHEROKEE TREATY SIGNATORIES
  // ============================================
  {
    slug: 'cherokee-treaty-signatories',
    title: 'Cherokee Signatories to the Treaty of Holston',
    date: '1791-07-02',
    dateDisplay: 'July 2, 1791',
    category: 'cherokee-sources',
    badge: 'Cherokee Source',
    whyThisMatters:
      'Forty-two Cherokee chiefs and warriors signed the Treaty of Holston on July 2, 1791. Their names—in Cherokee and English—are preserved in the treaty record. Their descendants continue today as the Cherokee Nation, Eastern Band of Cherokee Indians, and United Keetoowah Band of Cherokee Indians.',
    content: `<p>The Treaty of Holston was signed on July 2, 1791, at the treaty ground on the bank of the Holston River, near the mouth of the French Broad, within the Southwest Territory. Forty-two Cherokee chiefs and warriors signed the original treaty, with an additional article signed in Philadelphia on February 17, 1792.</p>

<p>The signatories represented both "peace" and "war" factions within the Cherokee Nation:</p>

<ul>
  <li><strong>Peace faction:</strong> Hanging Maw, Black Fox (sought accommodation with the United States)</li>
  <li><strong>War faction:</strong> John Watts, Bloody Fellow, Doublehead (initially resisted but signed)</li>
</ul>

<p>The ratification on November 11, 1791, failed to settle all outstanding differences, leading to the February 1792 delegation to Philadelphia and continued conflict until the 1794 Tellico Blockhouse agreement.</p>

<h3>Interpreters</h3>

<p><strong>Main Treaty (July 2, 1791):</strong> John Thompson and James Carey</p>

<p><strong>Additional Article (February 17, 1792):</strong> James Carey (sworn interpreter)</p>

<h3>U.S. Representative</h3>

<p>William Blount, Governor of the Southwest Territory and Superintendent of Indian Affairs for the Southern District</p>`,
    sources: [
      {
        name: 'Papers of the War Department',
        url: 'https://wardepartmentpapers.org/s/home/item/41698',
      },
      {
        name: 'Avalon Project, Yale Law School',
        url: 'https://avalon.law.yale.edu/18th_century/chr1791.asp',
      },
      {
        name: 'DigiTreaties',
        url: 'https://digitreaties.org/treaties/treaty/88697242/',
      },
    ],
    citation:
      '"Cherokee Signatories to the Treaty of Holston, 1791." Compiled by Rocky Mount State Historic Site from Papers of the War Department and Avalon Project. https://tennesseestartshere.com/evidence/documents/cherokee-treaty-signatories',
    relatedDocuments: [
      { slug: 'treaty-of-holston-1791', title: 'Treaty of Holston (July 2, 1791)' },
      {
        slug: 'washington-proclamation-1791',
        title: "Washington's Proclamation (November 11, 1791)",
      },
    ],
    chiefBiographies: [
      {
        cherokeeName: 'Squollecuttah',
        englishName: 'Hanging Maw',
        alternateNames: 'Scolacutta, Uskwali-guta',
        birthDeath: 'c. 1730 – c. 1796',
        role: 'Principal Chief of the Upper Towns (Overhill Cherokee)',
        biography:
          'Hanging Maw was the leading chief of the Overhill Cherokee from 1788 to 1794, following the death of Old Tassel. He claimed leadership by right of being the chief headman of the Overhill Towns. Following the failure of peace talks with Virginians in 1777, he initially supported Dragging Canoe and the Chickamauga faction, but after devastating American attacks in 1780, he joined Old Tassel in working for peace. He signed both the 1785 Treaty of Hopewell and the 1791 Treaty of Holston. In 1793, land disputes led Knoxville settlers to attack a Cherokee negotiating party led by Hanging Maw, wounding the chief and his wife and killing several Cherokee delegates.',
      },
      {
        cherokeeName: 'Nenetooyah',
        englishName: 'Bloody Fellow',
        alternateNames: 'Iskagua ("Clear Sky")',
        birthDeath: 'c. 1740 – c. 1800-1801',
        role: 'War chief, diplomatic spokesman',
        biography:
          'A supporter of Dragging Canoe and leader of the Chickamauga faction, Bloody Fellow was often a spokesperson for the Cherokee Nation in treaty negotiations. Following the death of Dragging Canoe in 1792, he became part of a triumvirate of leaders among the Chickamauga, along with John Watts and Doublehead. In early 1792, he led a delegation to Philadelphia to express Cherokee objections to the Treaty of Holston. During this visit, President George Washington conferred upon him the title of "General"—perhaps the only Cherokee to receive this honor prior to the Civil War. At the Holston negotiations, he was given the new name "Iskagua" (Clear Sky).',
      },
      {
        cherokeeName: 'Kunoskeskie',
        englishName: 'John Watts',
        alternateNames: 'Young Tassel, Ganodisgi',
        birthDeath: 'c. 1750 – c. 1808',
        role: 'War council head (skiagusta) of the Chickamauga Cherokee',
        biography:
          "Son of a white trader (John Watts Sr.) and a sister of Old Tassel, Doublehead, and Pumpkin Boy. After his uncle Old Tassel was murdered under a truce flag in 1788, Watts became active in warfare against the frontier settlements. When Dragging Canoe died in 1792, Watts succeeded him as war council head. He led major military campaigns, including a September 1792 attack on Buchanan's Station with over 1,000 Cherokee, Muscogee, and Shawnee warriors—one of the largest Native forces seen in the region. Described as 'an intelligent, clever, capable man who enjoyed eating, drinking, and jocular conversation,' he negotiated the 1794 Tellico Blockhouse agreement that ended the Cherokee-American wars.",
      },
      {
        cherokeeName: 'Chuquilatague',
        englishName: 'Doublehead',
        alternateNames: 'Tal-tsu-tsa, Dsugweladegi',
        birthDeath: 'c. 1744 – August 9, 1807',
        role: 'War chief, later Principal Chief of the Chickamauga',
        biography:
          "One of the most feared warriors of the Cherokee during the Cherokee-American wars. His siblings included Pumpkin Boy, Old Tassel, and the grandmother of Sequoyah. After his brother Old Tassel was killed under a truce in 1788, Doublehead became one of the most capable and vicious Cherokee war leaders. Following Dragging Canoe's death in 1792, he became part of the leadership triumvirate with Bloody Fellow and John Watts. On August 9, 1807, he was killed by Major Ridge, Alex Saunders, and John Rogers, either for control of the cotton trade or for his controversial ceding of Cherokee lands to the United States.",
      },
      {
        cherokeeName: 'Enoleh',
        englishName: 'Black Fox',
        alternateNames: 'Inali, E-no-li',
        birthDeath: 'c. 1746 – 1811',
        role: 'Principal Chief (1801-1811)',
        biography:
          'Brother-in-law of Dragging Canoe, Black Fox accompanied him on migrations to the Lower Towns during the Cherokee-American wars. He was the "Beloved Man" (headman) of Ustanali, an important settlement in present-day northwestern Georgia. He signed the Treaty of Holston in 1791 and was named Principal Chief in 1801, succeeding Little Turkey. Black Fox was the leading negotiator with the U.S. government and relinquished nearly 7,000 square miles in Tennessee and Alabama under the Treaty of 1806. He was deposed in 1808 for his role in this treaty but was reinstated in 1809.',
      },
    ],
    signatories: [
      { number: 1, cherokeeName: 'Chuleoah', englishName: 'The Boots' },
      { number: 2, cherokeeName: 'Squollecuttah', englishName: 'Hanging Maw' },
      { number: 3, cherokeeName: 'Oecunna', englishName: 'The Badger' },
      { number: 4, cherokeeName: 'Enoleh', englishName: 'Black Fox' },
      { number: 5, cherokeeName: 'Nontuaka', englishName: 'The Northward' },
      { number: 6, cherokeeName: 'Tekakiska' },
      { number: 7, cherokeeName: 'Tuckaseh', englishName: 'Terrapin' },
      { number: 8, cherokeeName: 'Kateh' },
      { number: 9, cherokeeName: 'Kunnochatutloh', englishName: 'The Crane' },
      { number: 10, cherokeeName: 'Canquillehanah', englishName: 'The Thigh' },
      { number: 11, cherokeeName: 'Chesquotteleneh', englishName: 'Yellow Bird' },
      { number: 12, cherokeeName: 'Chickasawtehe', englishName: 'Chickasaw Killer' },
      { number: 13, cherokeeName: 'Chutloh', englishName: 'King Fisher' },
      { number: 14, cherokeeName: 'Toowayelloh', englishName: 'Bold Hunter' },
      { number: 15, cherokeeName: 'Jahleoonoyehka', englishName: 'Middle Striker' },
      { number: 16, cherokeeName: 'Kinnesah', englishName: 'Cabin' },
      { number: 17, cherokeeName: 'Tullotehe', englishName: 'Two Killer' },
      { number: 18, cherokeeName: 'Kaalouske', englishName: 'Stopt Still' },
      { number: 19, cherokeeName: 'Kulsatehe' },
      { number: 20, cherokeeName: 'Auquotague', englishName: "Little Turkey's Son" },
      { number: 21, cherokeeName: 'Tuskegatehe', englishName: 'Tuskega Killer' },
      { number: 22, cherokeeName: 'Tinkshalene' },
      { number: 23, cherokeeName: 'Sawutteh', englishName: 'Slave Catcher' },
      { number: 24, cherokeeName: 'Aukuah' },
      { number: 25, cherokeeName: 'Oosenaleh' },
      { number: 26, cherokeeName: 'Kenotetah', englishName: 'Rising Fawn' },
      { number: 27, cherokeeName: 'Koolaquah', englishName: 'Big Acorn' },
      { number: 28, cherokeeName: 'Kanetetoka', englishName: 'Standing Turkey' },
      { number: 29, cherokeeName: 'Yonewatleh', englishName: 'Bear at Home' },
      { number: 30, cherokeeName: 'Long Will' },
      { number: 31, cherokeeName: 'Kunoskeskie', englishName: 'John Watts' },
      { number: 32, cherokeeName: 'Nenetooyah', englishName: 'Bloody Fellow' },
      { number: 33, cherokeeName: 'Chuquilatague', englishName: 'Double Head' },
      { number: 34, cherokeeName: 'Talohteske', englishName: 'Upsetter' },
      { number: 35, cherokeeName: 'Cheakoneske', englishName: 'Otter Lifter' },
      { number: 36, cherokeeName: 'Keshukaune', englishName: 'She Reigns' },
      { number: 37, cherokeeName: 'Toonaunailoh' },
      { number: 38, cherokeeName: 'Teesteke', englishName: 'Common Disturber' },
      { number: 39, cherokeeName: 'Robin McClemore' },
      { number: 40, cherokeeName: 'Skyuka' },
    ],
  },
]

export function getDocument(slug: string): HistoricalDocument | undefined {
  return documents.find((doc) => doc.slug === slug)
}

export function getDocumentsByCategory(
  category: HistoricalDocument['category']
): HistoricalDocument[] {
  return documents.filter((doc) => doc.category === category)
}

export function getAllDocuments(): HistoricalDocument[] {
  return documents
}

export function getAllSlugs(): string[] {
  return documents.map((doc) => doc.slug)
}
