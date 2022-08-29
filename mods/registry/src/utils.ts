/*
 * Copyright (C) 2022 by Fonoster Inc (https://fonoster.com)
 * http://github.com/fonoster
 *
 * This file is part of Routr.
 *
 * Licensed under the MIT License (the "License");
 * you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 *
 *    https://opensource.org/licenses/MIT
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import {
  DataAPI,
  FindCriteria,
  IRegistryStore,
  KIND,
  RegistrationEntry,
  Trunk
} from "./types"

// eslint-disable-next-line require-jsdoc
export function getUnregisteredTrunks(store: IRegistryStore) {
  return async (trunks: Trunk[]): Promise<Trunk[]> => {
    const registryEntries = await store.list()
    return trunks?.filter(
      (t: Trunk) =>
        !registryEntries
          .map((r: RegistrationEntry) => r.trunkRef)
          .includes(t.ref)
    )
  }
}

// eslint-disable-next-line require-jsdoc
export async function findTrunks(dataAPI: DataAPI) {
  return await dataAPI.findBy({
    kind: KIND.TRUNK,
    criteria: FindCriteria.FIND_TRUNKS_WITH_SEND_REGISTER,
    parameters: {}
  })
}
