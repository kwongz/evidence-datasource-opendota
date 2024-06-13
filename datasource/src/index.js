/**
 * This type describes the options that your connector expects to recieve
 * This could include username + password, host + port, etc
 * @typedef {Object} ConnectorOptions
 * @property {string} SomeOption
 */

import { EvidenceType } from "@evidence-dev/db-commons";

/**
 * @see https://docs.evidence.dev/plugins/creating-a-plugin/datasources#options-specification
 * @see https://github.com/evidence-dev/evidence/blob/main/packages/postgres/index.cjs#L316
 */
export const options = {
  SomeOption: {
    title: "Some Option",
    description:
      "This object defines how SomeOption should be displayed and configured in the Settings UI",
    type: "string", // options: 'string' | 'number' | 'boolean' | 'select' | 'file'
  },
};

/**
 * Implementing this function creates a "simple" connector
 *
 * Each file in the source directory will be passed to this function, and it will return
 * either an array, or an async generator {@see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function*}
 * that contains the query results
 *
 * @see https://docs.evidence.dev/plugins/creating-a-plugin/datasources#simple-interface-arrays
 * @type {import("@evidence-dev/db-commons").GetRunner<ConnectorOptions>}
 */
export const getRunner = (options) => {
  console.debug(`SomeOption = ${options.SomeOption}`);

  // This function will be called for EVERY file in the sources directory
  // If you are expecting a specific file type (e.g. SQL files), make sure to filter
  // to exclude others.

  // If you are using some local database file (e.g. a sqlite or duckdb file)
  // You may also need to filter that file out as well
  return async (queryText, queryPath) => {
    throw new Error("getRunner not implemented");
    // Example output
    const output = {
      rows: [
        { someInt: 1, someString: "string" },
        { someInt: 2, someString: "string2" },
      ],
      columnTypes: [
        {
          name: "someInt",
          evidenceType: EvidenceType.NUMBER,
          typeFidelity: "inferred",
        },
        {
          name: "someString",
          evidenceType: EvidenceType.STRING,
          typeFidelity: "inferred",
        },
      ],
      expectedRowCount: 2,
    };

    throw new Error("Query Runner has not yet been implemented");
  };
};

// Uncomment to use the advanced source interface
// This uses the `yield` keyword, and returns the same type as getRunner, but with an added `name` and `content` field (content is used for caching)
// sourceFiles provides an easy way to read the source directory to check for / iterate through files
/** @type {import("@evidence-dev/db-commons").ProcessSource<ConnectorOptions>} */
export async function* processSource(options, sourceFiles, utilFuncs) {
  // Requires Match id in Fetch Call
  // const matches = await fetch("https://api.opendota.com/api/matches").then(
  //   (r) => r.json()
  // );

  // yield {
  //   name: "matches",
  //   content: "matches",
  //   rows: matches,
  //   columnTypes: [
  //     {
  //       name: "match_id",
  //       evidenceType: EvidenceType.NUMBER,
  //       typeFidelity: "precise",
  //     },
  //     {
  //       name: "barracks_status_dire",
  //       evidenceType: EvidenceType.NUMBER,
  //       typeFidelity: "precise",
  //     },
  //     {
  //       name: "barracks_status_radiant",
  //       evidenceType: EvidenceType.NUMBER,
  //       typeFidelity: "precise",
  //     },
  //     {
  //       name: "dire_score",
  //       evidenceType: EvidenceType.NUMBER,
  //       typeFidelity: "precise",
  //     },
  //     {
  //       name: "duration",
  //       evidenceType: EvidenceType.NUMBER,
  //       typeFidelity: "precise",
  //     },
  //     {
  //       name: "first_blood_time",
  //       evidenceType: EvidenceType.NUMBER,
  //       typeFidelity: "precise",
  //     },
  //     {
  //       name: "game_mode",
  //       evidenceType: EvidenceType.NUMBER,
  //       typeFidelity: "precise",
  //     },
  //     {
  //       name: "pick_bans",
  //       evidenceType: EvidenceType.NUMBER,
  //       typeFidelity: "precise",
  //     },
  //   ],
  // };

  const proMatches = await fetch(
    "https://api.opendota.com/api/proMatches"
  ).then((r) => r.json());

  const heroes = await fetch("https://api.opendota.com/api/heroes").then((r) =>
    r.json()
  );
  const heroStats = await fetch("https://api.opendota.com/api/heroStats").then(
    (r) => r.json()
  );

  const playerData = await fetch(
    "https://api.opendota.com/api/players/{95365420}"
  ).then((r) => r.json());

  yield {
    name: "playerData",
    content: "playerData",
    rows: playerData,
    columnTypes: [
      {
        name: "solo_competitive_rank",
        evidenceType: EvidenceType.NUMBER,
        typeFidelity: "precise",
      },
      {
        name: "competitive_rank",
        evidenceType: EvidenceType.NUMBER,
        typeFidelity: "precise",
      },
      {
        name: "rank_tier",
        evidenceType: EvidenceType.NUMBER,
        typeFidelity: "precise",
      },
    ],
  };

  console.log(playerData);

  yield {
    name: "heroStats",
    content: "heroStats",
    rows: heroStats,
    columnTypes: [
      {
        name: "id",
        evidenceType: EvidenceType.NUMBER,
        typeFidelity: "precise",
      },
      {
        name: "name",
        evidenceType: EvidenceType.STRING,
        typeFidelity: "precise",
      },
      {
        name: "localized_name",
        evidenceType: EvidenceType.STRING,
        typeFidelity: "precise",
      },
      {
        name: "primary_attr",
        evidenceType: EvidenceType.STRING,
        typeFidelity: "precise",
      },
      {
        name: "attack_type",
        evidenceType: EvidenceType.STRING,
        typeFidelity: "precise",
      },
      {
        name: "roles",
        evidenceType: EvidenceType.STRING,
        typeFidelity: "precise",
      },
      {
        name: "base_health",
        evidenceType: EvidenceType.NUMBER,
        typeFidelity: "precise",
      },
      {
        name: "base_health_regen",
        evidenceType: EvidenceType.NUMBER,
        typeFidelity: "precise",
      },
      {
        name: "base_mana",
        evidenceType: EvidenceType.NUMBER,
        typeFidelity: "precise",
      },
      {
        name: "base_mana_regen",
        evidenceType: EvidenceType.NUMBER,
        typeFidelity: "precise",
      },
      {
        name: "base_armor",
        evidenceType: EvidenceType.NUMBER,
        typeFidelity: "precise",
      },
      {
        name: "base_attack_min",
        evidenceType: EvidenceType.NUMBER,
        typeFidelity: "precise",
      },
      {
        name: "base_attack_max",
        evidenceType: EvidenceType.NUMBER,
        typeFidelity: "precise",
      },
      {
        name: "base_str",
        evidenceType: EvidenceType.NUMBER,
        typeFidelity: "precise",
      },
      {
        name: "base_agi",
        evidenceType: EvidenceType.NUMBER,
        typeFidelity: "precise",
      },
      {
        name: "base_int",
        evidenceType: EvidenceType.NUMBER,
        typeFidelity: "precise",
      },
      {
        name: "str_gain",
        evidenceType: EvidenceType.NUMBER,
        typeFidelity: "precise",
      },
      {
        name: "agi_gain",
        evidenceType: EvidenceType.NUMBER,
        typeFidelity: "precise",
      },
      {
        name: "int_gain",
        evidenceType: EvidenceType.NUMBER,
        typeFidelity: "precise",
      },
      {
        name: "attack_range",
        evidenceType: EvidenceType.NUMBER,
        typeFidelity: "precise",
      },
      {
        name: "projectile_speed",
        evidenceType: EvidenceType.NUMBER,
        typeFidelity: "precise",
      },
      {
        name: "attack_rate",
        evidenceType: EvidenceType.NUMBER,
        typeFidelity: "precise",
      },
      {
        name: "move_speed",
        evidenceType: EvidenceType.NUMBER,
        typeFidelity: "precise",
      },
      {
        name: "turn_rate",
        evidenceType: EvidenceType.NUMBER,
        typeFidelity: "precise",
      },
      {
        name: "day_vision",
        evidenceType: EvidenceType.NUMBER,
        typeFidelity: "precise",
      },
      {
        name: "night_vision",
        evidenceType: EvidenceType.NUMBER,
        typeFidelity: "precise",
      },
      {
        name: "pro_ban",
        evidenceType: EvidenceType.NUMBER,
        typeFidelity: "precise",
      },
      {
        name: "pro_win",
        evidenceType: EvidenceType.NUMBER,
        typeFidelity: "precise",
      },
      {
        name: "pro_pick",
        evidenceType: EvidenceType.NUMBER,
        typeFidelity: "precise",
      },
    ],
  };

  yield {
    name: "heroes",
    content: "heroes",
    rows: heroes,
    columnTypes: [
      {
        name: "id",
        evidenceType: EvidenceType.NUMBER,
        typeFidelity: "precise",
      },
      {
        name: "name",
        evidenceType: EvidenceType.STRING,
        typeFidelity: "precise",
      },
      {
        name: "localized_name",
        evidenceType: EvidenceType.STRING,
        typeFidelity: "precise",
      },
      {
        name: "primary_attr",
        evidenceType: EvidenceType.STRING,
        typeFidelity: "precise",
      },
      {
        name: "attack_type",
        evidenceType: EvidenceType.STRING,
        typeFidelity: "precise",
      },
      {
        name: "roles",
        evidenceType: EvidenceType.STRING,
        typeFidelity: "precise",
      },
    ],
  };

  yield {
    name: "pro_matches",
    content: "proMatches",
    rows: proMatches,
    columnTypes: [
      {
        name: "match_id",
        evidenceType: EvidenceType.NUMBER,
        typeFidelity: "precise",
      },
      {
        name: "duration",
        evidenceType: EvidenceType.NUMBER,
        typeFidelity: "precise",
      },
      {
        name: "start_time",
        evidenceType: EvidenceType.DATE,
        typeFidelity: "inferred",
      },
      {
        name: "radiant_team_id",
        evidenceType: EvidenceType.NUMBER,
        typeFidelity: "precise",
      },
      {
        name: "radiant_name",
        evidenceType: EvidenceType.STRING,
        typeFidelity: "precise",
      },
      {
        name: "dire_team_id",
        evidenceType: EvidenceType.NUMBER,
        typeFidelity: "precise",
      },
      {
        name: "dire_name",
        evidenceType: EvidenceType.STRING,
        typeFidelity: "precise",
      },
      {
        name: "leagueid",
        evidenceType: EvidenceType.NUMBER,
        typeFidelity: "precise",
      },
      {
        name: "league_name",
        evidenceType: EvidenceType.STRING,
        typeFidelity: "precise",
      },
      {
        name: "series_id",
        evidenceType: EvidenceType.NUMBER,
        typeFidelity: "precise",
      },
      {
        name: "series_type",
        evidenceType: EvidenceType.NUMBER,
        typeFidelity: "precise",
      },
      {
        name: "radiant_score",
        evidenceType: EvidenceType.NUMBER,
        typeFidelity: "precise",
      },
      {
        name: "dire_score",
        evidenceType: EvidenceType.NUMBER,
        typeFidelity: "precise",
      },
      {
        name: "radiant_win",
        evidenceType: EvidenceType.BOOLEAN,
        typeFidelity: "precise",
      },
    ],
  };

  // yield {
  //   title: "some_demo_table",
  //   content: "SELECT * FROM some_demo_table", // This is ONLY used for caching
  //   rows: async function* () {}, // rows can be a generator function for returning batches of results (e.g. if an API is paginated, or database supports cursors)
  //   columnTypes: [
  //     {
  //       name: "someInt",
  //       evidenceType: EvidenceType.NUMBER,
  //       typeFidelity: "inferred",
  //     },
  // ],
  // };

  // throw new Error("Process Source has not yet been implemented");
}

/**
 * Implementing this function creates an "advanced" connector
 *
 *
 * @see https://docs.evidence.dev/plugins/creating-a-plugin/datasources#advanced-interface-generator-functions
 * @type {import("@evidence-dev/db-commons").GetRunner<ConnectorOptions>}
 */

/** @type {import("@evidence-dev/db-commons").ConnectionTester<ConnectorOptions>} */
export const testConnection = async (opts) => {
  return true;
  throw new Error("Connection test has not yet been implemented");
};
