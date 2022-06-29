/*
 * Copyright (C) 2022 by Fonoster Inc (https://fonoster.com)
 * http://github.com/fonoster/routr
 *
 * This file is part of Routr
 *
 * Licensed under the MIT License (the "License")
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
import {calculateAuthResponse, generateNonce} from "./auth"
import {ServiceUnavailableError} from "./errors"
import createService, {
  getObjectProto,
  LOCATION_OBJECT_PROTO,
  PROCESSOR_OBJECT_PROTO
} from "./service"
import {
  HeaderModifier,
  MessageRequest,
  MessageResponse,
  Method,
  NetInterface,
  ObjectProto,
  ProcessorConfig,
  Route,
  ServiceInfo,
  Transport
} from "./types"

export {
  createService,
  getObjectProto,
  generateNonce,
  calculateAuthResponse,
  HeaderModifier,
  Route,
  ServiceUnavailableError,
  Transport,
  ProcessorConfig,
  MessageRequest,
  MessageResponse,
  NetInterface,
  Method,
  ObjectProto,
  ServiceInfo,
  PROCESSOR_OBJECT_PROTO,
  LOCATION_OBJECT_PROTO
}

export * as CommonTypes from "./types"
export * as Helper from "./helper"
export * as IpUtils from "./ip_utils"
export * as Tracer from "./tracer"
export * as Assertions from "./assertions"