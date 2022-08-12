export const gameBuildingsTypes = [
  {
    id: '62e0e777663a9f95727518dd',
    name: 'Money Factory',
    image: 'money',
    buildMaterials: [
      {
        id: '62e0e366663a9f95727518bc',
        resourceType: 'money',
        calculation: {
          value: 40,
          pow: 1.5,
        },
      },
      {
        id: '62e0e366663a9f95727518bd',
        resourceType: 'iron',
        calculation: {
          value: 10,
          pow: 1.5,
        },
      },
    ],
    productionMaterials: [
      {
        id: '62e0e366663a9f95727518bc',
        resourceType: 'money',
        calculation: {
          value: 30,
          pow: 1.1,
        },
      },
      {
        id: '62e0e366663a9f95727518c0',
        resourceType: 'energy',
        calculation: {
          value: -10,
          pow: 1.1,
        },
      },
    ],
    description:
      'With the upswing in trade as well as the rising value of individual transactions, increasingly larger quantities of coins were needed. Due to the relatively high risk of counterfeiting, coins could not be issued with arbitrarily high denominations. ',
  },
  {
    id: '62e7dbadcefed5e153f6bb86',
    name: 'Iron Foundry',
    image: 'iron',
    buildMaterials: [
      {
        id: '62e0e366663a9f95727518bc',
        resourceType: 'money',
        calculation: {
          value: 30,
          pow: 1.6,
        },
      },
      {
        id: '62e0e366663a9f95727518bd',
        resourceType: 'iron',
        calculation: {
          value: 15,
          pow: 1.6,
        },
      },
    ],
    productionMaterials: [
      {
        id: '62e0e366663a9f95727518bd',
        resourceType: 'iron',
        calculation: {
          value: 20,
          pow: 1.1,
        },
      },
      {
        id: '62e0e366663a9f95727518c0',
        resourceType: 'energy',
        calculation: {
          value: -10,
          pow: 1.1,
        },
      },
    ],
    description:
      'Casting of metals and alloys is a manufacturing process in which workpieces are produced from liquid metal - the melt.',
  },
  {
    id: '62e7dbb2cefed5e153f6bb87',
    name: 'Oil Refinery',
    image: 'fuel',
    buildMaterials: [
      {
        id: '62e0e366663a9f95727518bc',
        resourceType: 'money',
        calculation: {
          value: 150,
          pow: 1.5,
        },
      },
      {
        id: '62e0e366663a9f95727518bd',
        resourceType: 'iron',
        calculation: {
          value: 50,
          pow: 1.5,
        },
      },
      {
        id: '62e0e366663a9f95727518be',
        resourceType: 'fuel',
        calculation: {
          value: 10,
          pow: 1.5,
        },
      }
    ],
    productionMaterials: [
      {
        id: '62e0e366663a9f95727518be',
        resourceType: 'fuel',
        calculation: {
          value: 10,
          pow: 1.1,
        },
      },
      {
        id: '62e0e366663a9f95727518c0',
        resourceType: 'energy',
        calculation: {
          value: -20,
          pow: 1.1,
        },
      },
    ],
    description:
      'An oil refinery is an industrial plant that converts the raw material crude oil into fractions with a defined boiling range by purification and distillation under normal pressure and under vacuum.',
  },
  {
    id: '62e7dbb7cefed5e153f6bb88',
    name: 'Windpower Plant',
    image: 'energy',
    buildMaterials: [
      {
        id: '62e0e366663a9f95727518bc',
        resourceType: 'money',
        calculation: {
          value: 40,
          pow: 1.5,
        },
      },
      {
        id: '62e0e366663a9f95727518bd',
        resourceType: 'iron',
        calculation: {
          value: 20,
          pow: 1.5,
        },
      },
    ],
    productionMaterials: [
      {
        id: '62e0e366663a9f95727518c0',
        resourceType: 'energy',
        calculation: {
          value: 20,
          pow: 1.1,
        },
      },
    ],
    description:
      'A Windpower plant converts the kinetic energy of the wind into electrical energy and feeds it into an electricity grid. Colloquially, the terms wind power plant or simply wind turbine are also used.',
  },
];
