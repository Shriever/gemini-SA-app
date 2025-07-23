export const mockSymbolIdResponse = {
  data: { id: '568851' },
};

export const mockEarningsResponse = {
  estimates: {
    '568851': {
      eps_normalized_actual: {
        '0': [{ dataitemvalue: '3.10', advancedate: '2025-07-21' }],
      },
      eps_gaap_actual: {
        '0': [{ dataitemvalue: '3.10' }],
      },
      revenue_actual: {
        '0': [{ dataitemvalue: '603310000.00' }],
      },
      revenue_consensus_mean: {
        '0': [{ dataitemvalue: '538780000.00' }],
      },
    },
  },
};

export const mockPressReleaseList = [
  { id: '20172455' }
];

export const mockPressReleaseDetails = {
  data: {
    attributes: {
      content: '<p>Test press release HTML</p><a href="">      </a>',
    },
  },
  included: [
    {
      attributes: {
        providerName: 'Business Wire',
      },
    },
  ],
};

export const mockTranscriptList = [
  { id: '12345678' }
];

export const mockTranscriptDetails = {
  data: {
    attributes: {
      content: '<p>Mocked transcript HTML</p>',
    },
  },
};
