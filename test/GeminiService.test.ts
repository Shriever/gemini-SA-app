import { expect } from 'chai';
import { generateGeminiPrompt } from './../src/api/geminiService';

describe('Gemini Service', () => {
  it('Should inject earnings data into prompt', () => {
    const earningsData = {
      announcementDate: '2025-07-21T20:15:00.000-04:00',
      epsNormalizedActual: 3.1,
      epsGAAPActual: 3.1,
      revenueActual: 603310000.0,
      revenueSurprise: 64530000.0,
    };

    const earningsText = `
      announcementDate: ${earningsData.announcementDate}
      epsNormalizedActual: $${earningsData.epsNormalizedActual}
      epsGAAPActual: $${earningsData.epsGAAPActual}
      revenueActual: $${earningsData.revenueActual}
      revenueSurprise: $${earningsData.revenueSurprise}
    `;
    const callTranscript = 'call transcript text';
    const pressRelease = 'press release text';
    const symbol = 'cri';

    expect(
      generateGeminiPrompt({
        earningsData,
        callTranscript: null,
        pressRelease: null,
        symbol,
      })
    ).to.include(earningsText);
    expect(
      generateGeminiPrompt({
        earningsData: null,
        callTranscript,
        pressRelease: null,
        symbol,
      })
    ).to.include(callTranscript);
    expect(
      generateGeminiPrompt({
        earningsData: null,
        callTranscript: null,
        pressRelease,
        symbol,
      })
    ).to.include(pressRelease);

    expect(
      generateGeminiPrompt({
        earningsData,
        callTranscript,
        pressRelease,
        symbol,
      })
    )
      .to.include(pressRelease)
      .and.to.include(callTranscript)
      .and.to.include(earningsText);
  });
});
