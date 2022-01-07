/*
 * Copyright (C) 2021 by Fonoster Inc (https://fonoster.com)
 * http://github.com/fonoster/routr
 *
 * This file is part of Routr
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
declare const Java: any

import {
  assertHasSecurityContext,
  assertNoDuplicatedPort,
  assertNoDuplicatedProto
} from "./assertions"
import createListeningPoints from "./create_listening_points"
import createSipProvider from "./create_sip_provider"
import createSipStack from "./create_sip_stack"
import getServerProperties from "./server_properties"
import { EdgePortConfig } from "./types"

const SipListener = Java.extend(Java.type("javax.sip.SipListener"))

// TODO: Needs testing
export default function EdgePort(config: EdgePortConfig) {
  return function () {
    assertNoDuplicatedProto(config.spec.transport)
    assertNoDuplicatedPort(config.spec.transport)
    assertHasSecurityContext(config)

    // TODO: Use pipe to stack all the methods
    const properties = getServerProperties(config)
    const sipStack = createSipStack(properties)
    const lps = createListeningPoints(sipStack, config)
    const sipProvider = createSipProvider(sipStack, lps)

    sipProvider.addSipListener(new SipListener({
      processRequest: function (event: any) {
        console.log('Request[in] = ' + event.getRequest())
      },
      processResponse: (event: any) => {
        console.log('Response[in] = ' + event.getResponse())
      }
    }))
  }
}