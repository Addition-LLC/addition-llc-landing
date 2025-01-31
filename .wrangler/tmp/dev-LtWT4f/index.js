var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
var __accessCheck = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet = (obj, member, getter) => {
  __accessCheck(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet = (obj, member, value, setter) => {
  __accessCheck(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};
var __privateMethod = (obj, member, method) => {
  __accessCheck(obj, member, "access private method");
  return method;
};

// .wrangler/tmp/bundle-up6FKb/checked-fetch.js
function checkURL(request, init2) {
  const url6 = request instanceof URL ? request : new URL(
    (typeof request === "string" ? new Request(request, init2) : request).url
  );
  if (url6.port && url6.port !== "443" && url6.protocol === "https:") {
    if (!urls.has(url6.toString())) {
      urls.add(url6.toString());
      console.warn(
        `WARNING: known issue with \`fetch()\` requests to custom HTTPS ports in published Workers:
 - ${url6.toString()} - the custom port will be ignored when the Worker is published using the \`wrangler deploy\` command.
`
      );
    }
  }
}
var urls;
var init_checked_fetch = __esm({
  ".wrangler/tmp/bundle-up6FKb/checked-fetch.js"() {
    "use strict";
    urls = /* @__PURE__ */ new Set();
    __name(checkURL, "checkURL");
    globalThis.fetch = new Proxy(globalThis.fetch, {
      apply(target, thisArg, argArray) {
        const [request, init2] = argArray;
        checkURL(request, init2);
        return Reflect.apply(target, thisArg, argArray);
      }
    });
  }
});

// wrangler-modules-watch:wrangler:modules-watch
var init_wrangler_modules_watch = __esm({
  "wrangler-modules-watch:wrangler:modules-watch"() {
    init_checked_fetch();
    init_modules_watch_stub();
  }
});

// ../../../.nvm/versions/node/v22.4.0/lib/node_modules/wrangler/templates/modules-watch-stub.js
var init_modules_watch_stub = __esm({
  "../../../.nvm/versions/node/v22.4.0/lib/node_modules/wrangler/templates/modules-watch-stub.js"() {
    init_wrangler_modules_watch();
  }
});

// dist/_worker.js/renderers.mjs
var renderers;
var init_renderers = __esm({
  "dist/_worker.js/renderers.mjs"() {
    "use strict";
    init_checked_fetch();
    init_modules_watch_stub();
    globalThis.process ??= {};
    globalThis.process.env ??= {};
    renderers = [];
  }
});

// dist/_worker.js/chunks/astro/assets-service_B44g93js.mjs
function normalizeLF(code) {
  return code.replace(/\r\n|\r(?!\n)|\n/g, "\n");
}
function codeFrame(src, loc) {
  if (!loc || loc.line === void 0 || loc.column === void 0) {
    return "";
  }
  const lines = normalizeLF(src).split("\n").map((ln) => ln.replace(/\t/g, "  "));
  const visibleLines = [];
  for (let n2 = -2; n2 <= 2; n2++) {
    if (lines[loc.line + n2])
      visibleLines.push(loc.line + n2);
  }
  let gutterWidth = 0;
  for (const lineNo of visibleLines) {
    let w = `> ${lineNo}`;
    if (w.length > gutterWidth)
      gutterWidth = w.length;
  }
  let output = "";
  for (const lineNo of visibleLines) {
    const isFocusedLine = lineNo === loc.line - 1;
    output += isFocusedLine ? "> " : "  ";
    output += `${lineNo + 1} | ${lines[lineNo]}
`;
    if (isFocusedLine)
      output += `${Array.from({ length: gutterWidth }).join(" ")}  | ${Array.from({
        length: loc.column
      }).join(" ")}^
`;
  }
  return output;
}
function appendForwardSlash(path) {
  return path.endsWith("/") ? path : path + "/";
}
function prependForwardSlash(path) {
  return path[0] === "/" ? path : "/" + path;
}
function removeTrailingForwardSlash(path) {
  return path.endsWith("/") ? path.slice(0, path.length - 1) : path;
}
function removeLeadingForwardSlash(path) {
  return path.startsWith("/") ? path.substring(1) : path;
}
function trimSlashes(path) {
  return path.replace(/^\/|\/$/g, "");
}
function isString(path) {
  return typeof path === "string" || path instanceof String;
}
function joinPaths(...paths) {
  return paths.filter(isString).map((path, i2) => {
    if (i2 === 0) {
      return removeTrailingForwardSlash(path);
    } else if (i2 === paths.length - 1) {
      return removeLeadingForwardSlash(path);
    } else {
      return trimSlashes(path);
    }
  }).join("/");
}
function isRemotePath(src) {
  return /^(?:http|ftp|https|ws):?\/\//.test(src) || src.startsWith("data:");
}
function slash(path) {
  return path.replace(/\\/g, "/");
}
function fileExtension(path) {
  const ext = path.split(".").pop();
  return ext !== path ? `.${ext}` : "";
}
function removeBase(path, base) {
  if (path.startsWith(base)) {
    return path.slice(removeTrailingForwardSlash(base).length);
  }
  return path;
}
var ClientAddressNotAvailable, PrerenderClientAddressNotAvailable, StaticClientAddressNotAvailable, NoMatchingStaticPathFound, OnlyResponseCanBeReturned, MissingMediaQueryDirective, NoMatchingRenderer, NoClientEntrypoint, NoClientOnlyHint, InvalidGetStaticPathsEntry, InvalidGetStaticPathsReturn, GetStaticPathsExpectedParams, GetStaticPathsInvalidRouteParam, GetStaticPathsRequired, ReservedSlotName, NoMatchingImport, InvalidComponentArgs, PageNumberParamNotFound, PrerenderDynamicEndpointPathCollide, ResponseSentError, MiddlewareNoDataOrNextCalled, MiddlewareNotAResponse, EndpointDidNotReturnAResponse, LocalsNotAnObject, AstroResponseHeadersReassigned, AstroGlobUsedOutside, AstroGlobNoMatch, i18nNoLocaleFoundInPath, RewriteWithBodyUsed, UnknownContentCollectionError, AstroError, VALID_INPUT_FORMATS;
var init_assets_service_B44g93js = __esm({
  "dist/_worker.js/chunks/astro/assets-service_B44g93js.mjs"() {
    "use strict";
    init_checked_fetch();
    init_modules_watch_stub();
    globalThis.process ??= {};
    globalThis.process.env ??= {};
    ClientAddressNotAvailable = {
      name: "ClientAddressNotAvailable",
      title: "`Astro.clientAddress` is not available in current adapter.",
      message: (adapterName) => `\`Astro.clientAddress\` is not available in the \`${adapterName}\` adapter. File an issue with the adapter to add support.`
    };
    PrerenderClientAddressNotAvailable = {
      name: "PrerenderClientAddressNotAvailable",
      title: "`Astro.clientAddress` cannot be used inside prerendered routes.",
      message: `\`Astro.clientAddress\` cannot be used inside prerendered routes`
    };
    StaticClientAddressNotAvailable = {
      name: "StaticClientAddressNotAvailable",
      title: "`Astro.clientAddress` is not available in static mode.",
      message: "`Astro.clientAddress` is only available when using `output: 'server'` or `output: 'hybrid'`. Update your Astro config if you need SSR features.",
      hint: "See https://docs.astro.build/en/guides/server-side-rendering/ for more information on how to enable SSR."
    };
    NoMatchingStaticPathFound = {
      name: "NoMatchingStaticPathFound",
      title: "No static path found for requested path.",
      message: (pathName) => `A \`getStaticPaths()\` route pattern was matched, but no matching static path was found for requested path \`${pathName}\`.`,
      hint: (possibleRoutes) => `Possible dynamic routes being matched: ${possibleRoutes.join(", ")}.`
    };
    OnlyResponseCanBeReturned = {
      name: "OnlyResponseCanBeReturned",
      title: "Invalid type returned by Astro page.",
      message: (route, returnedValue) => `Route \`${route ? route : ""}\` returned a \`${returnedValue}\`. Only a [Response](https://developer.mozilla.org/en-US/docs/Web/API/Response) can be returned from Astro files.`,
      hint: "See https://docs.astro.build/en/guides/server-side-rendering/#response for more information."
    };
    MissingMediaQueryDirective = {
      name: "MissingMediaQueryDirective",
      title: "Missing value for `client:media` directive.",
      message: 'Media query not provided for `client:media` directive. A media query similar to `client:media="(max-width: 600px)"` must be provided'
    };
    NoMatchingRenderer = {
      name: "NoMatchingRenderer",
      title: "No matching renderer found.",
      message: (componentName, componentExtension, plural, validRenderersCount) => `Unable to render \`${componentName}\`.

${validRenderersCount > 0 ? `There ${plural ? "are" : "is"} ${validRenderersCount} renderer${plural ? "s" : ""} configured in your \`astro.config.mjs\` file,
but ${plural ? "none were" : "it was not"} able to server-side render \`${componentName}\`.` : `No valid renderer was found ${componentExtension ? `for the \`.${componentExtension}\` file extension.` : `for this file extension.`}`}`,
      hint: (probableRenderers) => `Did you mean to enable the ${probableRenderers} integration?

See https://docs.astro.build/en/guides/framework-components/ for more information on how to install and configure integrations.`
    };
    NoClientEntrypoint = {
      name: "NoClientEntrypoint",
      title: "No client entrypoint specified in renderer.",
      message: (componentName, clientDirective, rendererName) => `\`${componentName}\` component has a \`client:${clientDirective}\` directive, but no client entrypoint was provided by \`${rendererName}\`.`,
      hint: "See https://docs.astro.build/en/reference/integrations-reference/#addrenderer-option for more information on how to configure your renderer."
    };
    NoClientOnlyHint = {
      name: "NoClientOnlyHint",
      title: "Missing hint on client:only directive.",
      message: (componentName) => `Unable to render \`${componentName}\`. When using the \`client:only\` hydration strategy, Astro needs a hint to use the correct renderer.`,
      hint: (probableRenderers) => `Did you mean to pass \`client:only="${probableRenderers}"\`? See https://docs.astro.build/en/reference/directives-reference/#clientonly for more information on client:only`
    };
    InvalidGetStaticPathsEntry = {
      name: "InvalidGetStaticPathsEntry",
      title: "Invalid entry inside getStaticPath's return value",
      message: (entryType) => `Invalid entry returned by getStaticPaths. Expected an object, got \`${entryType}\``,
      hint: "If you're using a `.map` call, you might be looking for `.flatMap()` instead. See https://docs.astro.build/en/reference/api-reference/#getstaticpaths for more information on getStaticPaths."
    };
    InvalidGetStaticPathsReturn = {
      name: "InvalidGetStaticPathsReturn",
      title: "Invalid value returned by getStaticPaths.",
      message: (returnType) => `Invalid type returned by \`getStaticPaths\`. Expected an \`array\`, got \`${returnType}\``,
      hint: "See https://docs.astro.build/en/reference/api-reference/#getstaticpaths for more information on getStaticPaths."
    };
    GetStaticPathsExpectedParams = {
      name: "GetStaticPathsExpectedParams",
      title: "Missing params property on `getStaticPaths` route.",
      message: "Missing or empty required `params` property on `getStaticPaths` route.",
      hint: "See https://docs.astro.build/en/reference/api-reference/#getstaticpaths for more information on getStaticPaths."
    };
    GetStaticPathsInvalidRouteParam = {
      name: "GetStaticPathsInvalidRouteParam",
      title: "Invalid value for `getStaticPaths` route parameter.",
      message: (key, value, valueType) => `Invalid getStaticPaths route parameter for \`${key}\`. Expected undefined, a string or a number, received \`${valueType}\` (\`${value}\`)`,
      hint: "See https://docs.astro.build/en/reference/api-reference/#getstaticpaths for more information on getStaticPaths."
    };
    GetStaticPathsRequired = {
      name: "GetStaticPathsRequired",
      title: "`getStaticPaths()` function required for dynamic routes.",
      message: "`getStaticPaths()` function is required for dynamic routes. Make sure that you `export` a `getStaticPaths` function from your dynamic route.",
      hint: `See https://docs.astro.build/en/guides/routing/#dynamic-routes for more information on dynamic routes.

Alternatively, set \`output: "server"\` or \`output: "hybrid"\` in your Astro config file to switch to a non-static server build. This error can also occur if using \`export const prerender = true;\`.
See https://docs.astro.build/en/guides/server-side-rendering/ for more information on non-static rendering.`
    };
    ReservedSlotName = {
      name: "ReservedSlotName",
      title: "Invalid slot name.",
      message: (slotName) => `Unable to create a slot named \`${slotName}\`. \`${slotName}\` is a reserved slot name. Please update the name of this slot.`
    };
    NoMatchingImport = {
      name: "NoMatchingImport",
      title: "No import found for component.",
      message: (componentName) => `Could not render \`${componentName}\`. No matching import has been found for \`${componentName}\`.`,
      hint: "Please make sure the component is properly imported."
    };
    InvalidComponentArgs = {
      name: "InvalidComponentArgs",
      title: "Invalid component arguments.",
      message: (name) => `Invalid arguments passed to${name ? ` <${name}>` : ""} component.`,
      hint: "Astro components cannot be rendered directly via function call, such as `Component()` or `{items.map(Component)}`."
    };
    PageNumberParamNotFound = {
      name: "PageNumberParamNotFound",
      title: "Page number param not found.",
      message: (paramName) => `[paginate()] page number param \`${paramName}\` not found in your filepath.`,
      hint: "Rename your file to `[page].astro` or `[...page].astro`."
    };
    PrerenderDynamicEndpointPathCollide = {
      name: "PrerenderDynamicEndpointPathCollide",
      title: "Prerendered dynamic endpoint has path collision.",
      message: (pathname) => `Could not render \`${pathname}\` with an \`undefined\` param as the generated path will collide during prerendering. Prevent passing \`undefined\` as \`params\` for the endpoint's \`getStaticPaths()\` function, or add an additional extension to the endpoint's filename.`,
      hint: (filename) => `Rename \`${filename}\` to \`${filename.replace(/\.(?:js|ts)/, (m2) => `.json` + m2)}\``
    };
    ResponseSentError = {
      name: "ResponseSentError",
      title: "Unable to set response.",
      message: "The response has already been sent to the browser and cannot be altered."
    };
    MiddlewareNoDataOrNextCalled = {
      name: "MiddlewareNoDataOrNextCalled",
      title: "The middleware didn't return a `Response`.",
      message: "Make sure your middleware returns a `Response` object, either directly or by returning the `Response` from calling the `next` function."
    };
    MiddlewareNotAResponse = {
      name: "MiddlewareNotAResponse",
      title: "The middleware returned something that is not a `Response` object.",
      message: "Any data returned from middleware must be a valid `Response` object."
    };
    EndpointDidNotReturnAResponse = {
      name: "EndpointDidNotReturnAResponse",
      title: "The endpoint did not return a `Response`.",
      message: "An endpoint must return either a `Response`, or a `Promise` that resolves with a `Response`."
    };
    LocalsNotAnObject = {
      name: "LocalsNotAnObject",
      title: "Value assigned to `locals` is not accepted.",
      message: "`locals` can only be assigned to an object. Other values like numbers, strings, etc. are not accepted.",
      hint: "If you tried to remove some information from the `locals` object, try to use `delete` or set the property to `undefined`."
    };
    AstroResponseHeadersReassigned = {
      name: "AstroResponseHeadersReassigned",
      title: "`Astro.response.headers` must not be reassigned.",
      message: "Individual headers can be added to and removed from `Astro.response.headers`, but it must not be replaced with another instance of `Headers` altogether.",
      hint: "Consider using `Astro.response.headers.add()`, and `Astro.response.headers.delete()`."
    };
    AstroGlobUsedOutside = {
      name: "AstroGlobUsedOutside",
      title: "Astro.glob() used outside of an Astro file.",
      message: (globStr) => `\`Astro.glob(${globStr})\` can only be used in \`.astro\` files. \`import.meta.glob(${globStr})\` can be used instead to achieve a similar result.`,
      hint: "See Vite's documentation on `import.meta.glob` for more information: https://vite.dev/guide/features.html#glob-import"
    };
    AstroGlobNoMatch = {
      name: "AstroGlobNoMatch",
      title: "Astro.glob() did not match any files.",
      message: (globStr) => `\`Astro.glob(${globStr})\` did not return any matching files.`,
      hint: "Check the pattern for typos."
    };
    i18nNoLocaleFoundInPath = {
      name: "i18nNoLocaleFoundInPath",
      title: "The path doesn't contain any locale",
      message: "You tried to use an i18n utility on a path that doesn't contain any locale. You can use `pathHasLocale` first to determine if the path has a locale."
    };
    RewriteWithBodyUsed = {
      name: "RewriteWithBodyUsed",
      title: "Cannot use Astro.rewrite after the request body has been read",
      message: "Astro.rewrite() cannot be used if the request body has already been read. If you need to read the body, first clone the request."
    };
    UnknownContentCollectionError = {
      name: "UnknownContentCollectionError",
      title: "Unknown Content Collection Error."
    };
    __name(normalizeLF, "normalizeLF");
    __name(codeFrame, "codeFrame");
    AstroError = class extends Error {
      loc;
      title;
      hint;
      frame;
      type = "AstroError";
      constructor(props, options) {
        const { name, title, message, stack, location, hint, frame } = props;
        super(message, options);
        this.title = title;
        this.name = name;
        if (message)
          this.message = message;
        this.stack = stack ? stack : this.stack;
        this.loc = location;
        this.hint = hint;
        this.frame = frame;
      }
      setLocation(location) {
        this.loc = location;
      }
      setName(name) {
        this.name = name;
      }
      setMessage(message) {
        this.message = message;
      }
      setHint(hint) {
        this.hint = hint;
      }
      setFrame(source, location) {
        this.frame = codeFrame(source, location);
      }
      static is(err) {
        return err.type === "AstroError";
      }
    };
    __name(AstroError, "AstroError");
    __name(appendForwardSlash, "appendForwardSlash");
    __name(prependForwardSlash, "prependForwardSlash");
    __name(removeTrailingForwardSlash, "removeTrailingForwardSlash");
    __name(removeLeadingForwardSlash, "removeLeadingForwardSlash");
    __name(trimSlashes, "trimSlashes");
    __name(isString, "isString");
    __name(joinPaths, "joinPaths");
    __name(isRemotePath, "isRemotePath");
    __name(slash, "slash");
    __name(fileExtension, "fileExtension");
    __name(removeBase, "removeBase");
    VALID_INPUT_FORMATS = [
      "jpeg",
      "jpg",
      "png",
      "tiff",
      "webp",
      "gif",
      "svg",
      "avif"
    ];
  }
});

// dist/_worker.js/chunks/parse_B89E6tSO.mjs
function decode64(string) {
  const binaryString = asciiToBinary(string);
  const arraybuffer = new ArrayBuffer(binaryString.length);
  const dv = new DataView(arraybuffer);
  for (let i2 = 0; i2 < arraybuffer.byteLength; i2++) {
    dv.setUint8(i2, binaryString.charCodeAt(i2));
  }
  return arraybuffer;
}
function asciiToBinary(data6) {
  if (data6.length % 4 === 0) {
    data6 = data6.replace(/==?$/, "");
  }
  let output = "";
  let buffer = 0;
  let accumulatedBits = 0;
  for (let i2 = 0; i2 < data6.length; i2++) {
    buffer <<= 6;
    buffer |= KEY_STRING.indexOf(data6[i2]);
    accumulatedBits += 6;
    if (accumulatedBits === 24) {
      output += String.fromCharCode((buffer & 16711680) >> 16);
      output += String.fromCharCode((buffer & 65280) >> 8);
      output += String.fromCharCode(buffer & 255);
      buffer = accumulatedBits = 0;
    }
  }
  if (accumulatedBits === 12) {
    buffer >>= 4;
    output += String.fromCharCode(buffer);
  } else if (accumulatedBits === 18) {
    buffer >>= 2;
    output += String.fromCharCode((buffer & 65280) >> 8);
    output += String.fromCharCode(buffer & 255);
  }
  return output;
}
function parse(serialized, revivers) {
  return unflatten(JSON.parse(serialized), revivers);
}
function unflatten(parsed, revivers) {
  if (typeof parsed === "number")
    return hydrate(parsed, true);
  if (!Array.isArray(parsed) || parsed.length === 0) {
    throw new Error("Invalid input");
  }
  const values = (
    /** @type {any[]} */
    parsed
  );
  const hydrated = Array(values.length);
  function hydrate(index, standalone = false) {
    if (index === UNDEFINED)
      return void 0;
    if (index === NAN)
      return NaN;
    if (index === POSITIVE_INFINITY)
      return Infinity;
    if (index === NEGATIVE_INFINITY)
      return -Infinity;
    if (index === NEGATIVE_ZERO)
      return -0;
    if (standalone)
      throw new Error(`Invalid input`);
    if (index in hydrated)
      return hydrated[index];
    const value = values[index];
    if (!value || typeof value !== "object") {
      hydrated[index] = value;
    } else if (Array.isArray(value)) {
      if (typeof value[0] === "string") {
        const type = value[0];
        const reviver = revivers?.[type];
        if (reviver) {
          return hydrated[index] = reviver(hydrate(value[1]));
        }
        switch (type) {
          case "Date":
            hydrated[index] = new Date(value[1]);
            break;
          case "Set":
            const set = /* @__PURE__ */ new Set();
            hydrated[index] = set;
            for (let i2 = 1; i2 < value.length; i2 += 1) {
              set.add(hydrate(value[i2]));
            }
            break;
          case "Map":
            const map = /* @__PURE__ */ new Map();
            hydrated[index] = map;
            for (let i2 = 1; i2 < value.length; i2 += 2) {
              map.set(hydrate(value[i2]), hydrate(value[i2 + 1]));
            }
            break;
          case "RegExp":
            hydrated[index] = new RegExp(value[1], value[2]);
            break;
          case "Object":
            hydrated[index] = Object(value[1]);
            break;
          case "BigInt":
            hydrated[index] = BigInt(value[1]);
            break;
          case "null":
            const obj = /* @__PURE__ */ Object.create(null);
            hydrated[index] = obj;
            for (let i2 = 1; i2 < value.length; i2 += 2) {
              obj[value[i2]] = hydrate(value[i2 + 1]);
            }
            break;
          case "Int8Array":
          case "Uint8Array":
          case "Uint8ClampedArray":
          case "Int16Array":
          case "Uint16Array":
          case "Int32Array":
          case "Uint32Array":
          case "Float32Array":
          case "Float64Array":
          case "BigInt64Array":
          case "BigUint64Array": {
            const TypedArrayConstructor = globalThis[type];
            const base64 = value[1];
            const arraybuffer = decode64(base64);
            const typedArray = new TypedArrayConstructor(arraybuffer);
            hydrated[index] = typedArray;
            break;
          }
          case "ArrayBuffer": {
            const base64 = value[1];
            const arraybuffer = decode64(base64);
            hydrated[index] = arraybuffer;
            break;
          }
          default:
            throw new Error(`Unknown type ${type}`);
        }
      } else {
        const array = new Array(value.length);
        hydrated[index] = array;
        for (let i2 = 0; i2 < value.length; i2 += 1) {
          const n2 = value[i2];
          if (n2 === HOLE)
            continue;
          array[i2] = hydrate(n2);
        }
      }
    } else {
      const object = {};
      hydrated[index] = object;
      for (const key in value) {
        const n2 = value[key];
        object[key] = hydrate(n2);
      }
    }
    return hydrated[index];
  }
  __name(hydrate, "hydrate");
  return hydrate(0);
}
var KEY_STRING, UNDEFINED, HOLE, NAN, POSITIVE_INFINITY, NEGATIVE_INFINITY, NEGATIVE_ZERO;
var init_parse_B89E6tSO = __esm({
  "dist/_worker.js/chunks/parse_B89E6tSO.mjs"() {
    "use strict";
    init_checked_fetch();
    init_modules_watch_stub();
    globalThis.process ??= {};
    globalThis.process.env ??= {};
    __name(decode64, "decode64");
    KEY_STRING = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    __name(asciiToBinary, "asciiToBinary");
    UNDEFINED = -1;
    HOLE = -2;
    NAN = -3;
    POSITIVE_INFINITY = -4;
    NEGATIVE_INFINITY = -5;
    NEGATIVE_ZERO = -6;
    __name(parse, "parse");
    __name(unflatten, "unflatten");
  }
});

// dist/_worker.js/chunks/astro/server_Den36nYv.mjs
function init(x, y2) {
  let rgx = new RegExp(`\\x1b\\[${y2}m`, "g");
  let open = `\x1B[${x}m`, close = `\x1B[${y2}m`;
  return function(txt) {
    if (!$.enabled || txt == null)
      return txt;
    return open + (!!~("" + txt).indexOf(close) ? txt.replace(rgx, close + open) : txt) + close;
  };
}
async function renderEndpoint(mod, context, ssr, logger) {
  const { request, url: url6 } = context;
  const method = request.method.toUpperCase();
  const handler = mod[method] ?? mod["ALL"];
  if (!ssr && ssr === false && method !== "GET") {
    logger.warn(
      "router",
      `${url6.pathname} ${bold(
        method
      )} requests are not available for a static site. Update your config to \`output: 'server'\` or \`output: 'hybrid'\` to enable.`
    );
  }
  if (handler === void 0) {
    logger.warn(
      "router",
      `No API Route handler exists for the method "${method}" for the route "${url6.pathname}".
Found handlers: ${Object.keys(mod).map((exp) => JSON.stringify(exp)).join(", ")}
` + ("all" in mod ? `One of the exported handlers is "all" (lowercase), did you mean to export 'ALL'?
` : "")
    );
    return new Response(null, { status: 404 });
  }
  if (typeof handler !== "function") {
    logger.error(
      "router",
      `The route "${url6.pathname}" exports a value for the method "${method}", but it is of the type ${typeof handler} instead of a function.`
    );
    return new Response(null, { status: 500 });
  }
  let response = await handler.call(mod, context);
  if (!response || response instanceof Response === false) {
    throw new AstroError(EndpointDidNotReturnAResponse);
  }
  if (REROUTABLE_STATUS_CODES.includes(response.status)) {
    try {
      response.headers.set(REROUTE_DIRECTIVE_HEADER, "no");
    } catch (err) {
      if (err.message?.includes("immutable")) {
        response = new Response(response.body, response);
        response.headers.set(REROUTE_DIRECTIVE_HEADER, "no");
      } else {
        throw err;
      }
    }
  }
  return response;
}
function validateArgs(args) {
  if (args.length !== 3)
    return false;
  if (!args[0] || typeof args[0] !== "object")
    return false;
  return true;
}
function baseCreateComponent(cb, moduleId, propagation) {
  const name = moduleId?.split("/").pop()?.replace(".astro", "") ?? "";
  const fn = /* @__PURE__ */ __name((...args) => {
    if (!validateArgs(args)) {
      throw new AstroError({
        ...InvalidComponentArgs,
        message: InvalidComponentArgs.message(name)
      });
    }
    return cb(...args);
  }, "fn");
  Object.defineProperty(fn, "name", { value: name, writable: false });
  fn.isAstroComponentFactory = true;
  fn.moduleId = moduleId;
  fn.propagation = propagation;
  return fn;
}
function createComponentWithOptions(opts) {
  const cb = baseCreateComponent(opts.factory, opts.moduleId, opts.propagation);
  return cb;
}
function createComponent(arg1, moduleId, propagation) {
  if (typeof arg1 === "function") {
    return baseCreateComponent(arg1, moduleId, propagation);
  } else {
    return createComponentWithOptions(arg1);
  }
}
function createAstroGlobFn() {
  const globHandler = /* @__PURE__ */ __name((importMetaGlobResult) => {
    if (typeof importMetaGlobResult === "string") {
      throw new AstroError({
        ...AstroGlobUsedOutside,
        message: AstroGlobUsedOutside.message(JSON.stringify(importMetaGlobResult))
      });
    }
    let allEntries = [...Object.values(importMetaGlobResult)];
    if (allEntries.length === 0) {
      throw new AstroError({
        ...AstroGlobNoMatch,
        message: AstroGlobNoMatch.message(JSON.stringify(importMetaGlobResult))
      });
    }
    return Promise.all(allEntries.map((fn) => fn()));
  }, "globHandler");
  return globHandler;
}
function createAstro(site) {
  return {
    // TODO: this is no longer necessary for `Astro.site`
    // but it somehow allows working around caching issues in content collections for some tests
    site: void 0,
    generator: `Astro v${ASTRO_VERSION}`,
    glob: createAstroGlobFn()
  };
}
function isPromise(value) {
  return !!value && typeof value === "object" && "then" in value && typeof value.then === "function";
}
async function* streamAsyncIterator(stream) {
  const reader = stream.getReader();
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done)
        return;
      yield value;
    }
  } finally {
    reader.releaseLock();
  }
}
function isHTMLString(value) {
  return Object.prototype.toString.call(value) === "[object HTMLString]";
}
function markHTMLBytes(bytes) {
  return new HTMLBytes(bytes);
}
function hasGetReader(obj) {
  return typeof obj.getReader === "function";
}
async function* unescapeChunksAsync(iterable) {
  if (hasGetReader(iterable)) {
    for await (const chunk of streamAsyncIterator(iterable)) {
      yield unescapeHTML(chunk);
    }
  } else {
    for await (const chunk of iterable) {
      yield unescapeHTML(chunk);
    }
  }
}
function* unescapeChunks(iterable) {
  for (const chunk of iterable) {
    yield unescapeHTML(chunk);
  }
}
function unescapeHTML(str) {
  if (!!str && typeof str === "object") {
    if (str instanceof Uint8Array) {
      return markHTMLBytes(str);
    } else if (str instanceof Response && str.body) {
      const body6 = str.body;
      return unescapeChunksAsync(body6);
    } else if (typeof str.then === "function") {
      return Promise.resolve(str).then((value) => {
        return unescapeHTML(value);
      });
    } else if (str[Symbol.for("astro:slot-string")]) {
      return str;
    } else if (Symbol.iterator in str) {
      return unescapeChunks(str);
    } else if (Symbol.asyncIterator in str || hasGetReader(str)) {
      return unescapeChunksAsync(str);
    }
  }
  return markHTMLString(str);
}
function isVNode(vnode) {
  return vnode && typeof vnode === "object" && vnode[AstroJSX];
}
function createRenderInstruction(instruction) {
  return Object.defineProperty(instruction, RenderInstructionSymbol, {
    value: true
  });
}
function isRenderInstruction(chunk) {
  return chunk && typeof chunk === "object" && chunk[RenderInstructionSymbol];
}
function r(e2) {
  var t2, f2, n2 = "";
  if ("string" == typeof e2 || "number" == typeof e2)
    n2 += e2;
  else if ("object" == typeof e2)
    if (Array.isArray(e2)) {
      var o2 = e2.length;
      for (t2 = 0; t2 < o2; t2++)
        e2[t2] && (f2 = r(e2[t2])) && (n2 && (n2 += " "), n2 += f2);
    } else
      for (f2 in e2)
        e2[f2] && (n2 && (n2 += " "), n2 += f2);
  return n2;
}
function clsx() {
  for (var e2, t2, f2 = 0, n2 = "", o2 = arguments.length; f2 < o2; f2++)
    (e2 = arguments[f2]) && (t2 = r(e2)) && (n2 && (n2 += " "), n2 += t2);
  return n2;
}
function serializeArray(value, metadata = {}, parents = /* @__PURE__ */ new WeakSet()) {
  if (parents.has(value)) {
    throw new Error(`Cyclic reference detected while serializing props for <${metadata.displayName} client:${metadata.hydrate}>!

Cyclic references cannot be safely serialized for client-side usage. Please remove the cyclic reference.`);
  }
  parents.add(value);
  const serialized = value.map((v) => {
    return convertToSerializedForm(v, metadata, parents);
  });
  parents.delete(value);
  return serialized;
}
function serializeObject(value, metadata = {}, parents = /* @__PURE__ */ new WeakSet()) {
  if (parents.has(value)) {
    throw new Error(`Cyclic reference detected while serializing props for <${metadata.displayName} client:${metadata.hydrate}>!

Cyclic references cannot be safely serialized for client-side usage. Please remove the cyclic reference.`);
  }
  parents.add(value);
  const serialized = Object.fromEntries(
    Object.entries(value).map(([k, v]) => {
      return [k, convertToSerializedForm(v, metadata, parents)];
    })
  );
  parents.delete(value);
  return serialized;
}
function convertToSerializedForm(value, metadata = {}, parents = /* @__PURE__ */ new WeakSet()) {
  const tag = Object.prototype.toString.call(value);
  switch (tag) {
    case "[object Date]": {
      return [PROP_TYPE.Date, value.toISOString()];
    }
    case "[object RegExp]": {
      return [PROP_TYPE.RegExp, value.source];
    }
    case "[object Map]": {
      return [PROP_TYPE.Map, serializeArray(Array.from(value), metadata, parents)];
    }
    case "[object Set]": {
      return [PROP_TYPE.Set, serializeArray(Array.from(value), metadata, parents)];
    }
    case "[object BigInt]": {
      return [PROP_TYPE.BigInt, value.toString()];
    }
    case "[object URL]": {
      return [PROP_TYPE.URL, value.toString()];
    }
    case "[object Array]": {
      return [PROP_TYPE.JSON, serializeArray(value, metadata, parents)];
    }
    case "[object Uint8Array]": {
      return [PROP_TYPE.Uint8Array, Array.from(value)];
    }
    case "[object Uint16Array]": {
      return [PROP_TYPE.Uint16Array, Array.from(value)];
    }
    case "[object Uint32Array]": {
      return [PROP_TYPE.Uint32Array, Array.from(value)];
    }
    default: {
      if (value !== null && typeof value === "object") {
        return [PROP_TYPE.Value, serializeObject(value, metadata, parents)];
      }
      if (value === Infinity) {
        return [PROP_TYPE.Infinity, 1];
      }
      if (value === -Infinity) {
        return [PROP_TYPE.Infinity, -1];
      }
      if (value === void 0) {
        return [PROP_TYPE.Value];
      }
      return [PROP_TYPE.Value, value];
    }
  }
}
function serializeProps(props, metadata) {
  const serialized = JSON.stringify(serializeObject(props, metadata));
  return serialized;
}
function extractDirectives(inputProps, clientDirectives) {
  let extracted = {
    isPage: false,
    hydration: null,
    props: {},
    propsWithoutTransitionAttributes: {}
  };
  for (const [key, value] of Object.entries(inputProps)) {
    if (key.startsWith("server:")) {
      if (key === "server:root") {
        extracted.isPage = true;
      }
    }
    if (key.startsWith("client:")) {
      if (!extracted.hydration) {
        extracted.hydration = {
          directive: "",
          value: "",
          componentUrl: "",
          componentExport: { value: "" }
        };
      }
      switch (key) {
        case "client:component-path": {
          extracted.hydration.componentUrl = value;
          break;
        }
        case "client:component-export": {
          extracted.hydration.componentExport.value = value;
          break;
        }
        case "client:component-hydration": {
          break;
        }
        case "client:display-name": {
          break;
        }
        default: {
          extracted.hydration.directive = key.split(":")[1];
          extracted.hydration.value = value;
          if (!clientDirectives.has(extracted.hydration.directive)) {
            const hydrationMethods = Array.from(clientDirectives.keys()).map((d2) => `client:${d2}`).join(", ");
            throw new Error(
              `Error: invalid hydration directive "${key}". Supported hydration methods: ${hydrationMethods}`
            );
          }
          if (extracted.hydration.directive === "media" && typeof extracted.hydration.value !== "string") {
            throw new AstroError(MissingMediaQueryDirective);
          }
          break;
        }
      }
    } else {
      extracted.props[key] = value;
      if (!transitionDirectivesToCopyOnIsland.includes(key)) {
        extracted.propsWithoutTransitionAttributes[key] = value;
      }
    }
  }
  for (const sym of Object.getOwnPropertySymbols(inputProps)) {
    extracted.props[sym] = inputProps[sym];
    extracted.propsWithoutTransitionAttributes[sym] = inputProps[sym];
  }
  return extracted;
}
async function generateHydrateScript(scriptOptions, metadata) {
  const { renderer, result, astroId, props, attrs } = scriptOptions;
  const { hydrate, componentUrl, componentExport } = metadata;
  if (!componentExport.value) {
    throw new AstroError({
      ...NoMatchingImport,
      message: NoMatchingImport.message(metadata.displayName)
    });
  }
  const island = {
    children: "",
    props: {
      // This is for HMR, probably can avoid it in prod
      uid: astroId
    }
  };
  if (attrs) {
    for (const [key, value] of Object.entries(attrs)) {
      island.props[key] = escapeHTML(value);
    }
  }
  island.props["component-url"] = await result.resolve(decodeURI(componentUrl));
  if (renderer.clientEntrypoint) {
    island.props["component-export"] = componentExport.value;
    island.props["renderer-url"] = await result.resolve(decodeURI(renderer.clientEntrypoint));
    island.props["props"] = escapeHTML(serializeProps(props, metadata));
  }
  island.props["ssr"] = "";
  island.props["client"] = hydrate;
  let beforeHydrationUrl = await result.resolve("astro:scripts/before-hydration.js");
  if (beforeHydrationUrl.length) {
    island.props["before-hydration-url"] = beforeHydrationUrl;
  }
  island.props["opts"] = escapeHTML(
    JSON.stringify({
      name: metadata.displayName,
      value: metadata.hydrateArgs || ""
    })
  );
  transitionDirectivesToCopyOnIsland.forEach((name) => {
    if (typeof props[name] !== "undefined") {
      island.props[name] = props[name];
    }
  });
  return island;
}
function bitwise(str) {
  let hash = 0;
  if (str.length === 0)
    return hash;
  for (let i2 = 0; i2 < str.length; i2++) {
    const ch = str.charCodeAt(i2);
    hash = (hash << 5) - hash + ch;
    hash = hash & hash;
  }
  return hash;
}
function shorthash(text) {
  let num;
  let result = "";
  let integer = bitwise(text);
  const sign = integer < 0 ? "Z" : "";
  integer = Math.abs(integer);
  while (integer >= binary) {
    num = integer % binary;
    integer = Math.floor(integer / binary);
    result = dictionary[num] + result;
  }
  if (integer > 0) {
    result = dictionary[integer] + result;
  }
  return sign + result;
}
function isAstroComponentFactory(obj) {
  return obj == null ? false : obj.isAstroComponentFactory === true;
}
function isAPropagatingComponent(result, factory) {
  let hint = factory.propagation || "none";
  if (factory.moduleId && result.componentMetadata.has(factory.moduleId) && hint === "none") {
    hint = result.componentMetadata.get(factory.moduleId).propagation;
  }
  return hint === "in-tree" || hint === "self";
}
function isHeadAndContent(obj) {
  return typeof obj === "object" && obj !== null && !!obj[headAndContentSym];
}
function createHeadAndContent(head, content) {
  return {
    [headAndContentSym]: true,
    head,
    content
  };
}
function determineIfNeedsHydrationScript(result) {
  if (result._metadata.hasHydrationScript) {
    return false;
  }
  return result._metadata.hasHydrationScript = true;
}
function determinesIfNeedsDirectiveScript(result, directive) {
  if (result._metadata.hasDirectives.has(directive)) {
    return false;
  }
  result._metadata.hasDirectives.add(directive);
  return true;
}
function getDirectiveScriptText(result, directive) {
  const clientDirectives = result.clientDirectives;
  const clientDirective = clientDirectives.get(directive);
  if (!clientDirective) {
    throw new Error(`Unknown directive: ${directive}`);
  }
  return clientDirective;
}
function getPrescripts(result, type, directive) {
  switch (type) {
    case "both":
      return `${ISLAND_STYLES}<script>${getDirectiveScriptText(result, directive)};${astro_island_prebuilt_default}<\/script>`;
    case "directive":
      return `<script>${getDirectiveScriptText(result, directive)}<\/script>`;
  }
  return "";
}
function defineScriptVars(vars) {
  let output = "";
  for (const [key, value] of Object.entries(vars)) {
    output += `const ${toIdent(key)} = ${JSON.stringify(value)?.replace(
      /<\/script>/g,
      "\\x3C/script>"
    )};
`;
  }
  return markHTMLString(output);
}
function formatList(values) {
  if (values.length === 1) {
    return values[0];
  }
  return `${values.slice(0, -1).join(", ")} or ${values[values.length - 1]}`;
}
function addAttribute(value, key, shouldEscape = true) {
  if (value == null) {
    return "";
  }
  if (value === false) {
    if (htmlEnumAttributes.test(key) || svgEnumAttributes.test(key)) {
      return markHTMLString(` ${key}="false"`);
    }
    return "";
  }
  if (STATIC_DIRECTIVES.has(key)) {
    console.warn(`[astro] The "${key}" directive cannot be applied dynamically at runtime. It will not be rendered as an attribute.

Make sure to use the static attribute syntax (\`${key}={value}\`) instead of the dynamic spread syntax (\`{...{ "${key}": value }}\`).`);
    return "";
  }
  if (key === "class:list") {
    const listValue = toAttributeString(clsx(value), shouldEscape);
    if (listValue === "") {
      return "";
    }
    return markHTMLString(` ${key.slice(0, -5)}="${listValue}"`);
  }
  if (key === "style" && !(value instanceof HTMLString)) {
    if (Array.isArray(value) && value.length === 2) {
      return markHTMLString(
        ` ${key}="${toAttributeString(`${toStyleString(value[0])};${value[1]}`, shouldEscape)}"`
      );
    }
    if (typeof value === "object") {
      return markHTMLString(` ${key}="${toAttributeString(toStyleString(value), shouldEscape)}"`);
    }
  }
  if (key === "className") {
    return markHTMLString(` class="${toAttributeString(value, shouldEscape)}"`);
  }
  if (typeof value === "string" && value.includes("&") && isHttpUrl(value)) {
    return markHTMLString(` ${key}="${toAttributeString(value, false)}"`);
  }
  if (value === true && (key.startsWith("data-") || htmlBooleanAttributes.test(key))) {
    return markHTMLString(` ${key}`);
  } else {
    return markHTMLString(` ${key}="${toAttributeString(value, shouldEscape)}"`);
  }
}
function internalSpreadAttributes(values, shouldEscape = true) {
  let output = "";
  for (const [key, value] of Object.entries(values)) {
    output += addAttribute(value, key, shouldEscape);
  }
  return markHTMLString(output);
}
function renderElement$1(name, { props: _props, children = "" }, shouldEscape = true) {
  const { lang: _, "data-astro-id": astroId, "define:vars": defineVars, ...props } = _props;
  if (defineVars) {
    if (name === "style") {
      delete props["is:global"];
      delete props["is:scoped"];
    }
    if (name === "script") {
      delete props.hoist;
      children = defineScriptVars(defineVars) + "\n" + children;
    }
  }
  if ((children == null || children == "") && voidElementNames.test(name)) {
    return `<${name}${internalSpreadAttributes(props, shouldEscape)}>`;
  }
  return `<${name}${internalSpreadAttributes(props, shouldEscape)}>${children}</${name}>`;
}
function renderToBufferDestination(bufferRenderFunction) {
  const renderer = new BufferedRenderer(bufferRenderFunction);
  return renderer;
}
function promiseWithResolvers() {
  let resolve, reject;
  const promise = new Promise((_resolve, _reject) => {
    resolve = _resolve;
    reject = _reject;
  });
  return {
    promise,
    resolve,
    reject
  };
}
function isHttpUrl(url6) {
  try {
    const parsedUrl = new URL(url6);
    return VALID_PROTOCOLS.includes(parsedUrl.protocol);
  } catch {
    return false;
  }
}
function renderAllHeadContent(result) {
  result._metadata.hasRenderedHead = true;
  const styles = Array.from(result.styles).filter(uniqueElements).map(
    (style) => style.props.rel === "stylesheet" ? renderElement$1("link", style) : renderElement$1("style", style)
  );
  result.styles.clear();
  const scripts = Array.from(result.scripts).filter(uniqueElements).map((script) => {
    return renderElement$1("script", script, false);
  });
  const links = Array.from(result.links).filter(uniqueElements).map((link) => renderElement$1("link", link, false));
  let content = styles.join("\n") + links.join("\n") + scripts.join("\n");
  if (result._metadata.extraHead.length > 0) {
    for (const part of result._metadata.extraHead) {
      content += part;
    }
  }
  return markHTMLString(content);
}
function renderHead() {
  return createRenderInstruction({ type: "head" });
}
function maybeRenderHead() {
  return createRenderInstruction({ type: "maybe-head" });
}
function isRenderTemplateResult(obj) {
  return typeof obj === "object" && obj !== null && !!obj[renderTemplateResultSym];
}
function renderTemplate(htmlParts, ...expressions) {
  return new RenderTemplateResult(htmlParts, expressions);
}
function isSlotString(str) {
  return !!str[slotString];
}
function renderSlot(result, slotted, fallback) {
  if (!slotted && fallback) {
    return renderSlot(result, fallback);
  }
  return {
    async render(destination) {
      await renderChild(destination, typeof slotted === "function" ? slotted(result) : slotted);
    }
  };
}
async function renderSlotToString(result, slotted, fallback) {
  let content = "";
  let instructions = null;
  const temporaryDestination = {
    write(chunk) {
      if (chunk instanceof SlotString) {
        content += chunk;
        if (chunk.instructions) {
          instructions ??= [];
          instructions.push(...chunk.instructions);
        }
      } else if (chunk instanceof Response)
        return;
      else if (typeof chunk === "object" && "type" in chunk && typeof chunk.type === "string") {
        if (instructions === null) {
          instructions = [];
        }
        instructions.push(chunk);
      } else {
        content += chunkToString(result, chunk);
      }
    }
  };
  const renderInstance = renderSlot(result, slotted, fallback);
  await renderInstance.render(temporaryDestination);
  return markHTMLString(new SlotString(content, instructions));
}
async function renderSlots(result, slots = {}) {
  let slotInstructions = null;
  let children = {};
  if (slots) {
    await Promise.all(
      Object.entries(slots).map(
        ([key, value]) => renderSlotToString(result, value).then((output) => {
          if (output.instructions) {
            if (slotInstructions === null) {
              slotInstructions = [];
            }
            slotInstructions.push(...output.instructions);
          }
          children[key] = output;
        })
      )
    );
  }
  return { slotInstructions, children };
}
function createSlotValueFromString(content) {
  return function() {
    return renderTemplate`${unescapeHTML(content)}`;
  };
}
function stringifyChunk(result, chunk) {
  if (isRenderInstruction(chunk)) {
    const instruction = chunk;
    switch (instruction.type) {
      case "directive": {
        const { hydration } = instruction;
        let needsHydrationScript = hydration && determineIfNeedsHydrationScript(result);
        let needsDirectiveScript = hydration && determinesIfNeedsDirectiveScript(result, hydration.directive);
        let prescriptType = needsHydrationScript ? "both" : needsDirectiveScript ? "directive" : null;
        if (prescriptType) {
          let prescripts = getPrescripts(result, prescriptType, hydration.directive);
          return markHTMLString(prescripts);
        } else {
          return "";
        }
      }
      case "head": {
        if (result._metadata.hasRenderedHead || result.partial) {
          return "";
        }
        return renderAllHeadContent(result);
      }
      case "maybe-head": {
        if (result._metadata.hasRenderedHead || result._metadata.headInTree || result.partial) {
          return "";
        }
        return renderAllHeadContent(result);
      }
      case "renderer-hydration-script": {
        const { rendererSpecificHydrationScripts } = result._metadata;
        const { rendererName } = instruction;
        if (!rendererSpecificHydrationScripts.has(rendererName)) {
          rendererSpecificHydrationScripts.add(rendererName);
          return instruction.render();
        }
        return "";
      }
      default: {
        throw new Error(`Unknown chunk type: ${chunk.type}`);
      }
    }
  } else if (chunk instanceof Response) {
    return "";
  } else if (isSlotString(chunk)) {
    let out = "";
    const c2 = chunk;
    if (c2.instructions) {
      for (const instr of c2.instructions) {
        out += stringifyChunk(result, instr);
      }
    }
    out += chunk.toString();
    return out;
  }
  return chunk.toString();
}
function chunkToString(result, chunk) {
  if (ArrayBuffer.isView(chunk)) {
    return decoder$1.decode(chunk);
  } else {
    return stringifyChunk(result, chunk);
  }
}
function chunkToByteArray(result, chunk) {
  if (ArrayBuffer.isView(chunk)) {
    return chunk;
  } else {
    const stringified = stringifyChunk(result, chunk);
    return encoder$1.encode(stringified.toString());
  }
}
function isRenderInstance(obj) {
  return !!obj && typeof obj === "object" && "render" in obj && typeof obj.render === "function";
}
async function renderChild(destination, child) {
  if (isPromise(child)) {
    child = await child;
  }
  if (child instanceof SlotString) {
    destination.write(child);
  } else if (isHTMLString(child)) {
    destination.write(child);
  } else if (Array.isArray(child)) {
    const childRenders = child.map((c2) => {
      return renderToBufferDestination((bufferDestination) => {
        return renderChild(bufferDestination, c2);
      });
    });
    for (const childRender of childRenders) {
      if (!childRender)
        continue;
      await childRender.renderToFinalDestination(destination);
    }
  } else if (typeof child === "function") {
    await renderChild(destination, child());
  } else if (typeof child === "string") {
    destination.write(markHTMLString(escapeHTML(child)));
  } else if (!child && child !== 0)
    ;
  else if (isRenderInstance(child)) {
    await child.render(destination);
  } else if (isRenderTemplateResult(child)) {
    await child.render(destination);
  } else if (isAstroComponentInstance(child)) {
    await child.render(destination);
  } else if (ArrayBuffer.isView(child)) {
    destination.write(child);
  } else if (typeof child === "object" && (Symbol.asyncIterator in child || Symbol.iterator in child)) {
    for await (const value of child) {
      await renderChild(destination, value);
    }
  } else {
    destination.write(child);
  }
}
function validateComponentProps(props, displayName) {
  if (props != null) {
    for (const prop of Object.keys(props)) {
      if (prop.startsWith("client:")) {
        console.warn(
          `You are attempting to render <${displayName} ${prop} />, but ${displayName} is an Astro component. Astro components do not render in the client and should not have a hydration directive. Please use a framework component for client rendering.`
        );
      }
    }
  }
}
function createAstroComponentInstance(result, displayName, factory, props, slots = {}) {
  validateComponentProps(props, displayName);
  const instance = new AstroComponentInstance(result, props, slots, factory);
  if (isAPropagatingComponent(result, factory)) {
    result._metadata.propagators.add(instance);
  }
  return instance;
}
function isAstroComponentInstance(obj) {
  return typeof obj === "object" && obj !== null && !!obj[astroComponentInstanceSym];
}
async function renderToString(result, componentFactory, props, children, isPage = false, route) {
  const templateResult = await callComponentAsTemplateResultOrResponse(
    result,
    componentFactory,
    props,
    children,
    route
  );
  if (templateResult instanceof Response)
    return templateResult;
  let str = "";
  let renderedFirstPageChunk = false;
  if (isPage) {
    await bufferHeadContent(result);
  }
  const destination = {
    write(chunk) {
      if (isPage && !renderedFirstPageChunk) {
        renderedFirstPageChunk = true;
        if (!result.partial && !DOCTYPE_EXP.test(String(chunk))) {
          const doctype = result.compressHTML ? "<!DOCTYPE html>" : "<!DOCTYPE html>\n";
          str += doctype;
        }
      }
      if (chunk instanceof Response)
        return;
      str += chunkToString(result, chunk);
    }
  };
  await templateResult.render(destination);
  return str;
}
async function renderToReadableStream(result, componentFactory, props, children, isPage = false, route) {
  const templateResult = await callComponentAsTemplateResultOrResponse(
    result,
    componentFactory,
    props,
    children,
    route
  );
  if (templateResult instanceof Response)
    return templateResult;
  let renderedFirstPageChunk = false;
  if (isPage) {
    await bufferHeadContent(result);
  }
  return new ReadableStream({
    start(controller) {
      const destination = {
        write(chunk) {
          if (isPage && !renderedFirstPageChunk) {
            renderedFirstPageChunk = true;
            if (!result.partial && !DOCTYPE_EXP.test(String(chunk))) {
              const doctype = result.compressHTML ? "<!DOCTYPE html>" : "<!DOCTYPE html>\n";
              controller.enqueue(encoder$1.encode(doctype));
            }
          }
          if (chunk instanceof Response) {
            throw new AstroError({
              ...ResponseSentError
            });
          }
          const bytes = chunkToByteArray(result, chunk);
          controller.enqueue(bytes);
        }
      };
      (async () => {
        try {
          await templateResult.render(destination);
          controller.close();
        } catch (e2) {
          if (AstroError.is(e2) && !e2.loc) {
            e2.setLocation({
              file: route?.component
            });
          }
          setTimeout(() => controller.error(e2), 0);
        }
      })();
    },
    cancel() {
      result.cancelled = true;
    }
  });
}
async function callComponentAsTemplateResultOrResponse(result, componentFactory, props, children, route) {
  const factoryResult = await componentFactory(result, props, children);
  if (factoryResult instanceof Response) {
    return factoryResult;
  } else if (isHeadAndContent(factoryResult)) {
    if (!isRenderTemplateResult(factoryResult.content)) {
      throw new AstroError({
        ...OnlyResponseCanBeReturned,
        message: OnlyResponseCanBeReturned.message(
          route?.route,
          typeof factoryResult
        ),
        location: {
          file: route?.component
        }
      });
    }
    return factoryResult.content;
  } else if (!isRenderTemplateResult(factoryResult)) {
    throw new AstroError({
      ...OnlyResponseCanBeReturned,
      message: OnlyResponseCanBeReturned.message(route?.route, typeof factoryResult),
      location: {
        file: route?.component
      }
    });
  }
  return factoryResult;
}
async function bufferHeadContent(result) {
  const iterator = result._metadata.propagators.values();
  while (true) {
    const { value, done } = iterator.next();
    if (done) {
      break;
    }
    const returnValue = await value.init(result);
    if (isHeadAndContent(returnValue)) {
      result._metadata.extraHead.push(returnValue.head);
    }
  }
}
async function renderToAsyncIterable(result, componentFactory, props, children, isPage = false, route) {
  const templateResult = await callComponentAsTemplateResultOrResponse(
    result,
    componentFactory,
    props,
    children,
    route
  );
  if (templateResult instanceof Response)
    return templateResult;
  let renderedFirstPageChunk = false;
  if (isPage) {
    await bufferHeadContent(result);
  }
  let error2 = null;
  let next = null;
  const buffer = [];
  let renderingComplete = false;
  const iterator = {
    async next() {
      if (result.cancelled)
        return { done: true, value: void 0 };
      if (next !== null) {
        await next.promise;
      } else if (!renderingComplete && !buffer.length) {
        next = promiseWithResolvers();
        await next.promise;
      }
      if (!renderingComplete) {
        next = promiseWithResolvers();
      }
      if (error2) {
        throw error2;
      }
      let length = 0;
      for (let i2 = 0, len = buffer.length; i2 < len; i2++) {
        length += buffer[i2].length;
      }
      let mergedArray = new Uint8Array(length);
      let offset = 0;
      for (let i2 = 0, len = buffer.length; i2 < len; i2++) {
        const item = buffer[i2];
        mergedArray.set(item, offset);
        offset += item.length;
      }
      buffer.length = 0;
      const returnValue = {
        // The iterator is done when rendering has finished
        // and there are no more chunks to return.
        done: length === 0 && renderingComplete,
        value: mergedArray
      };
      return returnValue;
    },
    async return() {
      result.cancelled = true;
      return { done: true, value: void 0 };
    }
  };
  const destination = {
    write(chunk) {
      if (isPage && !renderedFirstPageChunk) {
        renderedFirstPageChunk = true;
        if (!result.partial && !DOCTYPE_EXP.test(String(chunk))) {
          const doctype = result.compressHTML ? "<!DOCTYPE html>" : "<!DOCTYPE html>\n";
          buffer.push(encoder$1.encode(doctype));
        }
      }
      if (chunk instanceof Response) {
        throw new AstroError(ResponseSentError);
      }
      const bytes = chunkToByteArray(result, chunk);
      if (bytes.length > 0) {
        buffer.push(bytes);
        next?.resolve();
      } else if (buffer.length > 0) {
        next?.resolve();
      }
    }
  };
  const renderPromise = templateResult.render(destination);
  renderPromise.then(() => {
    renderingComplete = true;
    next?.resolve();
  }).catch((err) => {
    error2 = err;
    renderingComplete = true;
    next?.resolve();
  });
  return {
    [Symbol.asyncIterator]() {
      return iterator;
    }
  };
}
function componentIsHTMLElement(Component) {
  return typeof HTMLElement !== "undefined" && HTMLElement.isPrototypeOf(Component);
}
async function renderHTMLElement(result, constructor, props, slots) {
  const name = getHTMLElementName(constructor);
  let attrHTML = "";
  for (const attr in props) {
    attrHTML += ` ${attr}="${toAttributeString(await props[attr])}"`;
  }
  return markHTMLString(
    `<${name}${attrHTML}>${await renderSlotToString(result, slots?.default)}</${name}>`
  );
}
function getHTMLElementName(constructor) {
  const definedName = customElements.getName(constructor);
  if (definedName)
    return definedName;
  const assignedName = constructor.name.replace(/^HTML|Element$/g, "").replace(/[A-Z]/g, "-$&").toLowerCase().replace(/^-/, "html-");
  return assignedName;
}
function encodeHexUpperCase(data6) {
  let result = "";
  for (let i2 = 0; i2 < data6.length; i2++) {
    result += alphabetUpperCase[data6[i2] >> 4];
    result += alphabetUpperCase[data6[i2] & 15];
  }
  return result;
}
function decodeHex(data6) {
  if (data6.length % 2 !== 0) {
    throw new Error("Invalid hex string");
  }
  const result = new Uint8Array(data6.length / 2);
  for (let i2 = 0; i2 < data6.length; i2 += 2) {
    if (!(data6[i2] in decodeMap)) {
      throw new Error("Invalid character");
    }
    if (!(data6[i2 + 1] in decodeMap)) {
      throw new Error("Invalid character");
    }
    result[i2 / 2] |= decodeMap[data6[i2]] << 4;
    result[i2 / 2] |= decodeMap[data6[i2 + 1]];
  }
  return result;
}
function encodeBase64(bytes) {
  return encodeBase64_internal(bytes, base64Alphabet, EncodingPadding.Include);
}
function encodeBase64_internal(bytes, alphabet, padding) {
  let result = "";
  for (let i2 = 0; i2 < bytes.byteLength; i2 += 3) {
    let buffer = 0;
    let bufferBitSize = 0;
    for (let j2 = 0; j2 < 3 && i2 + j2 < bytes.byteLength; j2++) {
      buffer = buffer << 8 | bytes[i2 + j2];
      bufferBitSize += 8;
    }
    for (let j2 = 0; j2 < 4; j2++) {
      if (bufferBitSize >= 6) {
        result += alphabet[buffer >> bufferBitSize - 6 & 63];
        bufferBitSize -= 6;
      } else if (bufferBitSize > 0) {
        result += alphabet[buffer << 6 - bufferBitSize & 63];
        bufferBitSize = 0;
      } else if (padding === EncodingPadding.Include) {
        result += "=";
      }
    }
  }
  return result;
}
function decodeBase64(encoded) {
  return decodeBase64_internal(encoded, base64DecodeMap, DecodingPadding.Required);
}
function decodeBase64_internal(encoded, decodeMap2, padding) {
  const result = new Uint8Array(Math.ceil(encoded.length / 4) * 3);
  let totalBytes = 0;
  for (let i2 = 0; i2 < encoded.length; i2 += 4) {
    let chunk = 0;
    let bitsRead = 0;
    for (let j2 = 0; j2 < 4; j2++) {
      if (padding === DecodingPadding.Required && encoded[i2 + j2] === "=") {
        continue;
      }
      if (padding === DecodingPadding.Ignore && (i2 + j2 >= encoded.length || encoded[i2 + j2] === "=")) {
        continue;
      }
      if (j2 > 0 && encoded[i2 + j2 - 1] === "=") {
        throw new Error("Invalid padding");
      }
      if (!(encoded[i2 + j2] in decodeMap2)) {
        throw new Error("Invalid character");
      }
      chunk |= decodeMap2[encoded[i2 + j2]] << (3 - j2) * 6;
      bitsRead += 6;
    }
    if (bitsRead < 24) {
      let unused;
      if (bitsRead === 12) {
        unused = chunk & 65535;
      } else if (bitsRead === 18) {
        unused = chunk & 255;
      } else {
        throw new Error("Invalid padding");
      }
      if (unused !== 0) {
        throw new Error("Invalid padding");
      }
    }
    const byteLength = Math.floor(bitsRead / 8);
    for (let i3 = 0; i3 < byteLength; i3++) {
      result[totalBytes] = chunk >> 16 - i3 * 8 & 255;
      totalBytes++;
    }
  }
  return result.slice(0, totalBytes);
}
async function decodeKey(encoded) {
  const bytes = decodeBase64(encoded);
  return crypto.subtle.importKey("raw", bytes, ALGORITHM, true, ["encrypt", "decrypt"]);
}
async function encryptString(key, raw) {
  const iv = crypto.getRandomValues(new Uint8Array(IV_LENGTH / 2));
  const data6 = encoder.encode(raw);
  const buffer = await crypto.subtle.encrypt(
    {
      name: ALGORITHM,
      iv
    },
    key,
    data6
  );
  return encodeHexUpperCase(iv) + encodeBase64(new Uint8Array(buffer));
}
async function decryptString(key, encoded) {
  const iv = decodeHex(encoded.slice(0, IV_LENGTH));
  const dataArray = decodeBase64(encoded.slice(IV_LENGTH));
  const decryptedBuffer = await crypto.subtle.decrypt(
    {
      name: ALGORITHM,
      iv
    },
    key,
    dataArray
  );
  const decryptedString = decoder.decode(decryptedBuffer);
  return decryptedString;
}
function containsServerDirective(props) {
  return "server:component-directive" in props;
}
function safeJsonStringify(obj) {
  return JSON.stringify(obj).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029").replace(/</g, "\\u003c").replace(/>/g, "\\u003e").replace(/\//g, "\\u002f");
}
function renderServerIsland(result, _displayName, props, slots) {
  return {
    async render(destination) {
      const componentPath = props["server:component-path"];
      const componentExport = props["server:component-export"];
      const componentId = result.serverIslandNameMap.get(componentPath);
      if (!componentId) {
        throw new Error(`Could not find server component name`);
      }
      for (const key2 of Object.keys(props)) {
        if (internalProps.has(key2)) {
          delete props[key2];
        }
      }
      destination.write("<!--[if astro]>server-island-start<![endif]-->");
      const renderedSlots = {};
      for (const name in slots) {
        if (name !== "fallback") {
          const content = await renderSlotToString(result, slots[name]);
          renderedSlots[name] = content.toString();
        } else {
          await renderChild(destination, slots.fallback(result));
        }
      }
      const key = await result.key;
      const propsEncrypted = await encryptString(key, JSON.stringify(props));
      const hostId = crypto.randomUUID();
      const slash2 = result.base.endsWith("/") ? "" : "/";
      const serverIslandUrl = `${result.base}${slash2}_server-islands/${componentId}${result.trailingSlash === "always" ? "/" : ""}`;
      destination.write(`<script async type="module" data-island-id="${hostId}">
let componentId = ${safeJsonStringify(componentId)};
let componentExport = ${safeJsonStringify(componentExport)};
let script = document.querySelector('script[data-island-id="${hostId}"]');
let data = {
	componentExport,
	encryptedProps: ${safeJsonStringify(propsEncrypted)},
	slots: ${safeJsonStringify(renderedSlots)},
};

let response = await fetch('${serverIslandUrl}', {
	method: 'POST',
	body: JSON.stringify(data),
});

if(response.status === 200 && response.headers.get('content-type') === 'text/html') {
	let html = await response.text();

	// Swap!
	while(script.previousSibling &&
		script.previousSibling.nodeType !== 8 &&
		script.previousSibling.data !== '[if astro]>server-island-start<![endif]') {
		script.previousSibling.remove();
	}
	script.previousSibling?.remove();

	let frag = document.createRange().createContextualFragment(html);
	script.before(frag);
}
script.remove();
<\/script>`);
    }
  };
}
function guessRenderers(componentUrl) {
  const extname = componentUrl?.split(".").pop();
  switch (extname) {
    case "svelte":
      return ["@astrojs/svelte"];
    case "vue":
      return ["@astrojs/vue"];
    case "jsx":
    case "tsx":
      return ["@astrojs/react", "@astrojs/preact", "@astrojs/solid-js", "@astrojs/vue (jsx)"];
    default:
      return [
        "@astrojs/react",
        "@astrojs/preact",
        "@astrojs/solid-js",
        "@astrojs/vue",
        "@astrojs/svelte",
        "@astrojs/lit"
      ];
  }
}
function isFragmentComponent(Component) {
  return Component === Fragment;
}
function isHTMLComponent(Component) {
  return Component && Component["astro:html"] === true;
}
function removeStaticAstroSlot(html6, supportsAstroStaticSlot = true) {
  const exp = supportsAstroStaticSlot ? ASTRO_STATIC_SLOT_EXP : ASTRO_SLOT_EXP;
  return html6.replace(exp, "");
}
async function renderFrameworkComponent(result, displayName, Component, _props, slots = {}) {
  if (!Component && "client:only" in _props === false) {
    throw new Error(
      `Unable to render ${displayName} because it is ${Component}!
Did you forget to import the component or is it possible there is a typo?`
    );
  }
  const { renderers: renderers2, clientDirectives } = result;
  const metadata = {
    astroStaticSlot: true,
    displayName
  };
  const { hydration, isPage, props, propsWithoutTransitionAttributes } = extractDirectives(
    _props,
    clientDirectives
  );
  let html6 = "";
  let attrs = void 0;
  if (hydration) {
    metadata.hydrate = hydration.directive;
    metadata.hydrateArgs = hydration.value;
    metadata.componentExport = hydration.componentExport;
    metadata.componentUrl = hydration.componentUrl;
  }
  const probableRendererNames = guessRenderers(metadata.componentUrl);
  const validRenderers = renderers2.filter((r3) => r3.name !== "astro:jsx");
  const { children, slotInstructions } = await renderSlots(result, slots);
  let renderer;
  if (metadata.hydrate !== "only") {
    let isTagged = false;
    try {
      isTagged = Component && Component[Renderer];
    } catch {
    }
    if (isTagged) {
      const rendererName = Component[Renderer];
      renderer = renderers2.find(({ name }) => name === rendererName);
    }
    if (!renderer) {
      let error2;
      for (const r3 of renderers2) {
        try {
          if (await r3.ssr.check.call({ result }, Component, props, children)) {
            renderer = r3;
            break;
          }
        } catch (e2) {
          error2 ??= e2;
        }
      }
      if (!renderer && error2) {
        throw error2;
      }
    }
    if (!renderer && typeof HTMLElement === "function" && componentIsHTMLElement(Component)) {
      const output = await renderHTMLElement(
        result,
        Component,
        _props,
        slots
      );
      return {
        render(destination) {
          destination.write(output);
        }
      };
    }
  } else {
    if (metadata.hydrateArgs) {
      const rendererName = rendererAliases.has(metadata.hydrateArgs) ? rendererAliases.get(metadata.hydrateArgs) : metadata.hydrateArgs;
      if (clientOnlyValues.has(rendererName)) {
        renderer = renderers2.find(
          ({ name }) => name === `@astrojs/${rendererName}` || name === rendererName
        );
      }
    }
    if (!renderer && validRenderers.length === 1) {
      renderer = validRenderers[0];
    }
    if (!renderer) {
      const extname = metadata.componentUrl?.split(".").pop();
      renderer = renderers2.find(({ name }) => name === `@astrojs/${extname}` || name === extname);
    }
  }
  if (!renderer) {
    if (metadata.hydrate === "only") {
      const rendererName = rendererAliases.has(metadata.hydrateArgs) ? rendererAliases.get(metadata.hydrateArgs) : metadata.hydrateArgs;
      if (clientOnlyValues.has(rendererName)) {
        const plural = validRenderers.length > 1;
        throw new AstroError({
          ...NoMatchingRenderer,
          message: NoMatchingRenderer.message(
            metadata.displayName,
            metadata?.componentUrl?.split(".").pop(),
            plural,
            validRenderers.length
          ),
          hint: NoMatchingRenderer.hint(
            formatList(probableRendererNames.map((r3) => "`" + r3 + "`"))
          )
        });
      } else {
        throw new AstroError({
          ...NoClientOnlyHint,
          message: NoClientOnlyHint.message(metadata.displayName),
          hint: NoClientOnlyHint.hint(
            probableRendererNames.map((r3) => r3.replace("@astrojs/", "")).join("|")
          )
        });
      }
    } else if (typeof Component !== "string") {
      const matchingRenderers = validRenderers.filter(
        (r3) => probableRendererNames.includes(r3.name)
      );
      const plural = validRenderers.length > 1;
      if (matchingRenderers.length === 0) {
        throw new AstroError({
          ...NoMatchingRenderer,
          message: NoMatchingRenderer.message(
            metadata.displayName,
            metadata?.componentUrl?.split(".").pop(),
            plural,
            validRenderers.length
          ),
          hint: NoMatchingRenderer.hint(
            formatList(probableRendererNames.map((r3) => "`" + r3 + "`"))
          )
        });
      } else if (matchingRenderers.length === 1) {
        renderer = matchingRenderers[0];
        ({ html: html6, attrs } = await renderer.ssr.renderToStaticMarkup.call(
          { result },
          Component,
          propsWithoutTransitionAttributes,
          children,
          metadata
        ));
      } else {
        throw new Error(`Unable to render ${metadata.displayName}!

This component likely uses ${formatList(probableRendererNames)},
but Astro encountered an error during server-side rendering.

Please ensure that ${metadata.displayName}:
1. Does not unconditionally access browser-specific globals like \`window\` or \`document\`.
   If this is unavoidable, use the \`client:only\` hydration directive.
2. Does not conditionally return \`null\` or \`undefined\` when rendered on the server.

If you're still stuck, please open an issue on GitHub or join us at https://astro.build/chat.`);
      }
    }
  } else {
    if (metadata.hydrate === "only") {
      const rendererName = rendererAliases.has(metadata.hydrateArgs) ? rendererAliases.get(metadata.hydrateArgs) : metadata.hydrateArgs;
      if (!clientOnlyValues.has(rendererName)) {
        console.warn(
          `The client:only directive for ${metadata.displayName} is not recognized. The renderer ${renderer.name} will be used. If you intended to use a different renderer, please provide a valid client:only directive.`
        );
      }
      html6 = await renderSlotToString(result, slots?.fallback);
    } else {
      performance.now();
      ({ html: html6, attrs } = await renderer.ssr.renderToStaticMarkup.call(
        { result },
        Component,
        propsWithoutTransitionAttributes,
        children,
        metadata
      ));
    }
  }
  if (renderer && !renderer.clientEntrypoint && renderer.name !== "@astrojs/lit" && metadata.hydrate) {
    throw new AstroError({
      ...NoClientEntrypoint,
      message: NoClientEntrypoint.message(
        displayName,
        metadata.hydrate,
        renderer.name
      )
    });
  }
  if (!html6 && typeof Component === "string") {
    const Tag = sanitizeElementName(Component);
    const childSlots = Object.values(children).join("");
    const renderTemplateResult = renderTemplate`<${Tag}${internalSpreadAttributes(
      props
    )}${markHTMLString(
      childSlots === "" && voidElementNames.test(Tag) ? `/>` : `>${childSlots}</${Tag}>`
    )}`;
    html6 = "";
    const destination = {
      write(chunk) {
        if (chunk instanceof Response)
          return;
        html6 += chunkToString(result, chunk);
      }
    };
    await renderTemplateResult.render(destination);
  }
  if (!hydration) {
    return {
      render(destination) {
        if (slotInstructions) {
          for (const instruction of slotInstructions) {
            destination.write(instruction);
          }
        }
        if (isPage || renderer?.name === "astro:jsx") {
          destination.write(html6);
        } else if (html6 && html6.length > 0) {
          destination.write(
            markHTMLString(removeStaticAstroSlot(html6, renderer?.ssr?.supportsAstroStaticSlot))
          );
        }
      }
    };
  }
  const astroId = shorthash(
    `<!--${metadata.componentExport.value}:${metadata.componentUrl}-->
${html6}
${serializeProps(
      props,
      metadata
    )}`
  );
  const island = await generateHydrateScript(
    { renderer, result, astroId, props, attrs },
    metadata
  );
  let unrenderedSlots = [];
  if (html6) {
    if (Object.keys(children).length > 0) {
      for (const key of Object.keys(children)) {
        let tagName = renderer?.ssr?.supportsAstroStaticSlot ? !!metadata.hydrate ? "astro-slot" : "astro-static-slot" : "astro-slot";
        let expectedHTML = key === "default" ? `<${tagName}>` : `<${tagName} name="${key}">`;
        if (!html6.includes(expectedHTML)) {
          unrenderedSlots.push(key);
        }
      }
    }
  } else {
    unrenderedSlots = Object.keys(children);
  }
  const template2 = unrenderedSlots.length > 0 ? unrenderedSlots.map(
    (key) => `<template data-astro-template${key !== "default" ? `="${key}"` : ""}>${children[key]}</template>`
  ).join("") : "";
  island.children = `${html6 ?? ""}${template2}`;
  if (island.children) {
    island.props["await-children"] = "";
    island.children += `<!--astro:end-->`;
  }
  return {
    render(destination) {
      if (slotInstructions) {
        for (const instruction of slotInstructions) {
          destination.write(instruction);
        }
      }
      destination.write(createRenderInstruction({ type: "directive", hydration }));
      if (hydration.directive !== "only" && renderer?.ssr.renderHydrationScript) {
        destination.write(
          createRenderInstruction({
            type: "renderer-hydration-script",
            rendererName: renderer.name,
            render: renderer.ssr.renderHydrationScript
          })
        );
      }
      const renderedElement = renderElement$1("astro-island", island, false);
      destination.write(markHTMLString(renderedElement));
    }
  };
}
function sanitizeElementName(tag) {
  const unsafe = /[&<>'"\s]+/;
  if (!unsafe.test(tag))
    return tag;
  return tag.trim().split(unsafe)[0].trim();
}
async function renderFragmentComponent(result, slots = {}) {
  const children = await renderSlotToString(result, slots?.default);
  return {
    render(destination) {
      if (children == null)
        return;
      destination.write(children);
    }
  };
}
async function renderHTMLComponent(result, Component, _props, slots = {}) {
  const { slotInstructions, children } = await renderSlots(result, slots);
  const html6 = Component({ slots: children });
  const hydrationHtml = slotInstructions ? slotInstructions.map((instr) => chunkToString(result, instr)).join("") : "";
  return {
    render(destination) {
      destination.write(markHTMLString(hydrationHtml + html6));
    }
  };
}
function renderAstroComponent(result, displayName, Component, props, slots = {}) {
  if (containsServerDirective(props)) {
    return renderServerIsland(result, displayName, props, slots);
  }
  const instance = createAstroComponentInstance(result, displayName, Component, props, slots);
  return {
    async render(destination) {
      await instance.render(destination);
    }
  };
}
async function renderComponent(result, displayName, Component, props, slots = {}) {
  if (isPromise(Component)) {
    Component = await Component.catch(handleCancellation);
  }
  if (isFragmentComponent(Component)) {
    return await renderFragmentComponent(result, slots).catch(handleCancellation);
  }
  props = normalizeProps(props);
  if (isHTMLComponent(Component)) {
    return await renderHTMLComponent(result, Component, props, slots).catch(handleCancellation);
  }
  if (isAstroComponentFactory(Component)) {
    return renderAstroComponent(result, displayName, Component, props, slots);
  }
  return await renderFrameworkComponent(result, displayName, Component, props, slots).catch(
    handleCancellation
  );
  function handleCancellation(e2) {
    if (result.cancelled)
      return {
        render() {
        }
      };
    throw e2;
  }
  __name(handleCancellation, "handleCancellation");
}
function normalizeProps(props) {
  if (props["class:list"] !== void 0) {
    const value = props["class:list"];
    delete props["class:list"];
    props["class"] = clsx(props["class"], value);
    if (props["class"] === "") {
      delete props["class"];
    }
  }
  return props;
}
async function renderComponentToString(result, displayName, Component, props, slots = {}, isPage = false, route) {
  let str = "";
  let renderedFirstPageChunk = false;
  let head = "";
  if (isPage && !result.partial && nonAstroPageNeedsHeadInjection(Component)) {
    head += chunkToString(result, maybeRenderHead());
  }
  try {
    const destination = {
      write(chunk) {
        if (isPage && !result.partial && !renderedFirstPageChunk) {
          renderedFirstPageChunk = true;
          if (!/<!doctype html/i.test(String(chunk))) {
            const doctype = result.compressHTML ? "<!DOCTYPE html>" : "<!DOCTYPE html>\n";
            str += doctype + head;
          }
        }
        if (chunk instanceof Response)
          return;
        str += chunkToString(result, chunk);
      }
    };
    const renderInstance = await renderComponent(result, displayName, Component, props, slots);
    await renderInstance.render(destination);
  } catch (e2) {
    if (AstroError.is(e2) && !e2.loc) {
      e2.setLocation({
        file: route?.component
      });
    }
    throw e2;
  }
  return str;
}
function nonAstroPageNeedsHeadInjection(pageComponent) {
  return !!pageComponent?.[needsHeadRenderingSymbol];
}
async function renderJSX(result, vnode) {
  switch (true) {
    case vnode instanceof HTMLString:
      if (vnode.toString().trim() === "") {
        return "";
      }
      return vnode;
    case typeof vnode === "string":
      return markHTMLString(escapeHTML(vnode));
    case typeof vnode === "function":
      return vnode;
    case (!vnode && vnode !== 0):
      return "";
    case Array.isArray(vnode):
      return markHTMLString(
        (await Promise.all(vnode.map((v) => renderJSX(result, v)))).join("")
      );
  }
  return renderJSXVNode(result, vnode);
}
async function renderJSXVNode(result, vnode) {
  if (isVNode(vnode)) {
    switch (true) {
      case !vnode.type: {
        throw new Error(`Unable to render ${result.pathname} because it contains an undefined Component!
Did you forget to import the component or is it possible there is a typo?`);
      }
      case vnode.type === Symbol.for("astro:fragment"):
        return renderJSX(result, vnode.props.children);
      case vnode.type.isAstroComponentFactory: {
        let props = {};
        let slots = {};
        for (const [key, value] of Object.entries(vnode.props ?? {})) {
          if (key === "children" || value && typeof value === "object" && value["$$slot"]) {
            slots[key === "children" ? "default" : key] = () => renderJSX(result, value);
          } else {
            props[key] = value;
          }
        }
        const str = await renderToString(result, vnode.type, props, slots);
        if (str instanceof Response) {
          throw str;
        }
        const html6 = markHTMLString(str);
        return html6;
      }
      case (!vnode.type && vnode.type !== 0):
        return "";
      case (typeof vnode.type === "string" && vnode.type !== ClientOnlyPlaceholder):
        return markHTMLString(await renderElement(result, vnode.type, vnode.props ?? {}));
    }
    if (vnode.type) {
      let extractSlots2 = /* @__PURE__ */ __name(function(child) {
        if (Array.isArray(child)) {
          return child.map((c2) => extractSlots2(c2));
        }
        if (!isVNode(child)) {
          _slots.default.push(child);
          return;
        }
        if ("slot" in child.props) {
          _slots[child.props.slot] = [..._slots[child.props.slot] ?? [], child];
          delete child.props.slot;
          return;
        }
        _slots.default.push(child);
      }, "extractSlots2");
      if (typeof vnode.type === "function" && vnode.props["server:root"]) {
        const output2 = await vnode.type(vnode.props ?? {});
        return await renderJSX(result, output2);
      }
      if (typeof vnode.type === "function") {
        if (vnode.props[hasTriedRenderComponentSymbol]) {
          delete vnode.props[hasTriedRenderComponentSymbol];
          const output2 = await vnode.type(vnode.props ?? {});
          if (output2?.[AstroJSX] || !output2) {
            return await renderJSXVNode(result, output2);
          } else {
            return;
          }
        } else {
          vnode.props[hasTriedRenderComponentSymbol] = true;
        }
      }
      const { children = null, ...props } = vnode.props ?? {};
      const _slots = {
        default: []
      };
      extractSlots2(children);
      for (const [key, value] of Object.entries(props)) {
        if (value?.["$$slot"]) {
          _slots[key] = value;
          delete props[key];
        }
      }
      const slotPromises = [];
      const slots = {};
      for (const [key, value] of Object.entries(_slots)) {
        slotPromises.push(
          renderJSX(result, value).then((output2) => {
            if (output2.toString().trim().length === 0)
              return;
            slots[key] = () => output2;
          })
        );
      }
      await Promise.all(slotPromises);
      let output;
      if (vnode.type === ClientOnlyPlaceholder && vnode.props["client:only"]) {
        output = await renderComponentToString(
          result,
          vnode.props["client:display-name"] ?? "",
          null,
          props,
          slots
        );
      } else {
        output = await renderComponentToString(
          result,
          typeof vnode.type === "function" ? vnode.type.name : vnode.type,
          vnode.type,
          props,
          slots
        );
      }
      return markHTMLString(output);
    }
  }
  return markHTMLString(`${vnode}`);
}
async function renderElement(result, tag, { children, ...props }) {
  return markHTMLString(
    `<${tag}${spreadAttributes(props)}${markHTMLString(
      (children == null || children == "") && voidElementNames.test(tag) ? `/>` : `>${children == null ? "" : await renderJSX(result, prerenderElementChildren(tag, children))}</${tag}>`
    )}`
  );
}
function prerenderElementChildren(tag, children) {
  if (typeof children === "string" && (tag === "style" || tag === "script")) {
    return markHTMLString(children);
  } else {
    return children;
  }
}
async function renderPage(result, componentFactory, props, children, streaming, route) {
  if (!isAstroComponentFactory(componentFactory)) {
    result._metadata.headInTree = result.componentMetadata.get(componentFactory.moduleId)?.containsHead ?? false;
    const pageProps = { ...props ?? {}, "server:root": true };
    const str = await renderComponentToString(
      result,
      componentFactory.name,
      componentFactory,
      pageProps,
      {},
      true,
      route
    );
    const bytes = encoder$1.encode(str);
    return new Response(bytes, {
      headers: new Headers([
        ["Content-Type", "text/html; charset=utf-8"],
        ["Content-Length", bytes.byteLength.toString()]
      ])
    });
  }
  result._metadata.headInTree = result.componentMetadata.get(componentFactory.moduleId)?.containsHead ?? false;
  let body6;
  if (streaming) {
    if (isNode && !isDeno) {
      const nodeBody = await renderToAsyncIterable(
        result,
        componentFactory,
        props,
        children,
        true,
        route
      );
      body6 = nodeBody;
    } else {
      body6 = await renderToReadableStream(result, componentFactory, props, children, true, route);
    }
  } else {
    body6 = await renderToString(result, componentFactory, props, children, true, route);
  }
  if (body6 instanceof Response)
    return body6;
  const init2 = result.response;
  const headers = new Headers(init2.headers);
  if (!streaming && typeof body6 === "string") {
    body6 = encoder$1.encode(body6);
    headers.set("Content-Length", body6.byteLength.toString());
  }
  if (route?.component.endsWith(".md")) {
    headers.set("Content-Type", "text/html; charset=utf-8");
  }
  let status = init2.status;
  if (route?.route === "/404") {
    status = 404;
  } else if (route?.route === "/500") {
    status = 500;
  }
  if (status) {
    return new Response(body6, { ...init2, headers, status });
  } else {
    return new Response(body6, { ...init2, headers });
  }
}
function renderScriptElement({ props, children }) {
  return renderElement$1("script", {
    props,
    children
  });
}
function renderUniqueStylesheet(result, sheet) {
  if (sheet.type === "external") {
    if (Array.from(result.styles).some((s2) => s2.props.href === sheet.src))
      return "";
    return renderElement$1("link", { props: { rel: "stylesheet", href: sheet.src }, children: "" });
  }
  if (sheet.type === "inline") {
    if (Array.from(result.styles).some((s2) => s2.children.includes(sheet.content)))
      return "";
    return renderElement$1("style", { props: {}, children: sheet.content });
  }
}
function spreadAttributes(values = {}, _name, { class: scopedClassName } = {}) {
  let output = "";
  if (scopedClassName) {
    if (typeof values.class !== "undefined") {
      values.class += ` ${scopedClassName}`;
    } else if (typeof values["class:list"] !== "undefined") {
      values["class:list"] = [values["class:list"], scopedClassName];
    } else {
      values.class = scopedClassName;
    }
  }
  for (const [key, value] of Object.entries(values)) {
    output += addAttribute(value, key, true);
  }
  return markHTMLString(output);
}
var ASTRO_VERSION, REROUTE_DIRECTIVE_HEADER, REWRITE_DIRECTIVE_HEADER_KEY, REWRITE_DIRECTIVE_HEADER_VALUE, ROUTE_TYPE_HEADER, DEFAULT_404_COMPONENT, REROUTABLE_STATUS_CODES, clientAddressSymbol, clientLocalsSymbol, originPathnameSymbol, responseSentSymbol, FORCE_COLOR, NODE_DISABLE_COLORS, NO_COLOR, TERM, isTTY, $, bold, dim, red, yellow, blue, replace, ca, esca, pe, escape, escapeHTML, HTMLBytes, HTMLString, markHTMLString, AstroJSX, RenderInstructionSymbol, PROP_TYPE, transitionDirectivesToCopyOnIsland, dictionary, binary, headAndContentSym, astro_island_prebuilt_default, ISLAND_STYLES, voidElementNames, htmlBooleanAttributes, htmlEnumAttributes, svgEnumAttributes, AMPERSAND_REGEX, DOUBLE_QUOTE_REGEX, STATIC_DIRECTIVES, toIdent, toAttributeString, kebab, toStyleString, noop, BufferedRenderer, isNode, isDeno, VALID_PROTOCOLS, uniqueElements, renderTemplateResultSym, RenderTemplateResult, slotString, SlotString, Fragment, Renderer, encoder$1, decoder$1, astroComponentInstanceSym, AstroComponentInstance, DOCTYPE_EXP, alphabetUpperCase, decodeMap, EncodingPadding$1, DecodingPadding$1, base64Alphabet, EncodingPadding, DecodingPadding, base64DecodeMap, ALGORITHM, encoder, decoder, IV_LENGTH, internalProps, needsHeadRenderingSymbol, rendererAliases, clientOnlyValues, ASTRO_SLOT_EXP, ASTRO_STATIC_SLOT_EXP, ClientOnlyPlaceholder, hasTriedRenderComponentSymbol;
var init_server_Den36nYv = __esm({
  "dist/_worker.js/chunks/astro/server_Den36nYv.mjs"() {
    "use strict";
    init_checked_fetch();
    init_modules_watch_stub();
    init_assets_service_B44g93js();
    globalThis.process ??= {};
    globalThis.process.env ??= {};
    ASTRO_VERSION = "4.16.7";
    REROUTE_DIRECTIVE_HEADER = "X-Astro-Reroute";
    REWRITE_DIRECTIVE_HEADER_KEY = "X-Astro-Rewrite";
    REWRITE_DIRECTIVE_HEADER_VALUE = "yes";
    ROUTE_TYPE_HEADER = "X-Astro-Route-Type";
    DEFAULT_404_COMPONENT = "astro-default-404.astro";
    REROUTABLE_STATUS_CODES = [404, 500];
    clientAddressSymbol = Symbol.for("astro.clientAddress");
    clientLocalsSymbol = Symbol.for("astro.locals");
    originPathnameSymbol = Symbol.for("astro.originPathname");
    responseSentSymbol = Symbol.for("astro.responseSent");
    isTTY = true;
    if (typeof process !== "undefined") {
      ({ FORCE_COLOR, NODE_DISABLE_COLORS, NO_COLOR, TERM } = process.env || {});
      isTTY = process.stdout && process.stdout.isTTY;
    }
    $ = {
      enabled: !NODE_DISABLE_COLORS && NO_COLOR == null && TERM !== "dumb" && (FORCE_COLOR != null && FORCE_COLOR !== "0" || isTTY)
    };
    __name(init, "init");
    bold = init(1, 22);
    dim = init(2, 22);
    red = init(31, 39);
    yellow = init(33, 39);
    blue = init(34, 39);
    __name(renderEndpoint, "renderEndpoint");
    __name(validateArgs, "validateArgs");
    __name(baseCreateComponent, "baseCreateComponent");
    __name(createComponentWithOptions, "createComponentWithOptions");
    __name(createComponent, "createComponent");
    __name(createAstroGlobFn, "createAstroGlobFn");
    __name(createAstro, "createAstro");
    ({ replace } = "");
    ca = /[&<>'"]/g;
    esca = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "'": "&#39;",
      '"': "&quot;"
    };
    pe = /* @__PURE__ */ __name((m2) => esca[m2], "pe");
    escape = /* @__PURE__ */ __name((es) => replace.call(es, ca, pe), "escape");
    __name(isPromise, "isPromise");
    __name(streamAsyncIterator, "streamAsyncIterator");
    escapeHTML = escape;
    HTMLBytes = class extends Uint8Array {
    };
    __name(HTMLBytes, "HTMLBytes");
    Object.defineProperty(HTMLBytes.prototype, Symbol.toStringTag, {
      get() {
        return "HTMLBytes";
      }
    });
    HTMLString = class extends String {
      get [Symbol.toStringTag]() {
        return "HTMLString";
      }
    };
    __name(HTMLString, "HTMLString");
    markHTMLString = /* @__PURE__ */ __name((value) => {
      if (value instanceof HTMLString) {
        return value;
      }
      if (typeof value === "string") {
        return new HTMLString(value);
      }
      return value;
    }, "markHTMLString");
    __name(isHTMLString, "isHTMLString");
    __name(markHTMLBytes, "markHTMLBytes");
    __name(hasGetReader, "hasGetReader");
    __name(unescapeChunksAsync, "unescapeChunksAsync");
    __name(unescapeChunks, "unescapeChunks");
    __name(unescapeHTML, "unescapeHTML");
    AstroJSX = "astro:jsx";
    __name(isVNode, "isVNode");
    RenderInstructionSymbol = Symbol.for("astro:render");
    __name(createRenderInstruction, "createRenderInstruction");
    __name(isRenderInstruction, "isRenderInstruction");
    __name(r, "r");
    __name(clsx, "clsx");
    PROP_TYPE = {
      Value: 0,
      JSON: 1,
      // Actually means Array
      RegExp: 2,
      Date: 3,
      Map: 4,
      Set: 5,
      BigInt: 6,
      URL: 7,
      Uint8Array: 8,
      Uint16Array: 9,
      Uint32Array: 10,
      Infinity: 11
    };
    __name(serializeArray, "serializeArray");
    __name(serializeObject, "serializeObject");
    __name(convertToSerializedForm, "convertToSerializedForm");
    __name(serializeProps, "serializeProps");
    transitionDirectivesToCopyOnIsland = Object.freeze([
      "data-astro-transition-scope",
      "data-astro-transition-persist",
      "data-astro-transition-persist-props"
    ]);
    __name(extractDirectives, "extractDirectives");
    __name(generateHydrateScript, "generateHydrateScript");
    dictionary = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXY";
    binary = dictionary.length;
    __name(bitwise, "bitwise");
    __name(shorthash, "shorthash");
    __name(isAstroComponentFactory, "isAstroComponentFactory");
    __name(isAPropagatingComponent, "isAPropagatingComponent");
    headAndContentSym = Symbol.for("astro.headAndContent");
    __name(isHeadAndContent, "isHeadAndContent");
    __name(createHeadAndContent, "createHeadAndContent");
    astro_island_prebuilt_default = `(()=>{var A=Object.defineProperty;var g=(i,o,a)=>o in i?A(i,o,{enumerable:!0,configurable:!0,writable:!0,value:a}):i[o]=a;var d=(i,o,a)=>g(i,typeof o!="symbol"?o+"":o,a);{let i={0:t=>m(t),1:t=>a(t),2:t=>new RegExp(t),3:t=>new Date(t),4:t=>new Map(a(t)),5:t=>new Set(a(t)),6:t=>BigInt(t),7:t=>new URL(t),8:t=>new Uint8Array(t),9:t=>new Uint16Array(t),10:t=>new Uint32Array(t),11:t=>1/0*t},o=t=>{let[l,e]=t;return l in i?i[l](e):void 0},a=t=>t.map(o),m=t=>typeof t!="object"||t===null?t:Object.fromEntries(Object.entries(t).map(([l,e])=>[l,o(e)]));class y extends HTMLElement{constructor(){super(...arguments);d(this,"Component");d(this,"hydrator");d(this,"hydrate",async()=>{var b;if(!this.hydrator||!this.isConnected)return;let e=(b=this.parentElement)==null?void 0:b.closest("astro-island[ssr]");if(e){e.addEventListener("astro:hydrate",this.hydrate,{once:!0});return}let c=this.querySelectorAll("astro-slot"),n={},h=this.querySelectorAll("template[data-astro-template]");for(let r of h){let s=r.closest(this.tagName);s!=null&&s.isSameNode(this)&&(n[r.getAttribute("data-astro-template")||"default"]=r.innerHTML,r.remove())}for(let r of c){let s=r.closest(this.tagName);s!=null&&s.isSameNode(this)&&(n[r.getAttribute("name")||"default"]=r.innerHTML)}let p;try{p=this.hasAttribute("props")?m(JSON.parse(this.getAttribute("props"))):{}}catch(r){let s=this.getAttribute("component-url")||"<unknown>",v=this.getAttribute("component-export");throw v&&(s+=\` (export \${v})\`),console.error(\`[hydrate] Error parsing props for component \${s}\`,this.getAttribute("props"),r),r}let u;await this.hydrator(this)(this.Component,p,n,{client:this.getAttribute("client")}),this.removeAttribute("ssr"),this.dispatchEvent(new CustomEvent("astro:hydrate"))});d(this,"unmount",()=>{this.isConnected||this.dispatchEvent(new CustomEvent("astro:unmount"))})}disconnectedCallback(){document.removeEventListener("astro:after-swap",this.unmount),document.addEventListener("astro:after-swap",this.unmount,{once:!0})}connectedCallback(){if(!this.hasAttribute("await-children")||document.readyState==="interactive"||document.readyState==="complete")this.childrenConnectedCallback();else{let e=()=>{document.removeEventListener("DOMContentLoaded",e),c.disconnect(),this.childrenConnectedCallback()},c=new MutationObserver(()=>{var n;((n=this.lastChild)==null?void 0:n.nodeType)===Node.COMMENT_NODE&&this.lastChild.nodeValue==="astro:end"&&(this.lastChild.remove(),e())});c.observe(this,{childList:!0}),document.addEventListener("DOMContentLoaded",e)}}async childrenConnectedCallback(){let e=this.getAttribute("before-hydration-url");e&&await import(e),this.start()}async start(){let e=JSON.parse(this.getAttribute("opts")),c=this.getAttribute("client");if(Astro[c]===void 0){window.addEventListener(\`astro:\${c}\`,()=>this.start(),{once:!0});return}try{await Astro[c](async()=>{let n=this.getAttribute("renderer-url"),[h,{default:p}]=await Promise.all([import(this.getAttribute("component-url")),n?import(n):()=>()=>{}]),u=this.getAttribute("component-export")||"default";if(!u.includes("."))this.Component=h[u];else{this.Component=h;for(let f of u.split("."))this.Component=this.Component[f]}return this.hydrator=p,this.hydrate},e,this)}catch(n){console.error(\`[astro-island] Error hydrating \${this.getAttribute("component-url")}\`,n)}}attributeChangedCallback(){this.hydrate()}}d(y,"observedAttributes",["props"]),customElements.get("astro-island")||customElements.define("astro-island",y)}})();`;
    ISLAND_STYLES = `<style>astro-island,astro-slot,astro-static-slot{display:contents}</style>`;
    __name(determineIfNeedsHydrationScript, "determineIfNeedsHydrationScript");
    __name(determinesIfNeedsDirectiveScript, "determinesIfNeedsDirectiveScript");
    __name(getDirectiveScriptText, "getDirectiveScriptText");
    __name(getPrescripts, "getPrescripts");
    voidElementNames = /^(area|base|br|col|command|embed|hr|img|input|keygen|link|meta|param|source|track|wbr)$/i;
    htmlBooleanAttributes = /^(?:allowfullscreen|async|autofocus|autoplay|controls|default|defer|disabled|disablepictureinpicture|disableremoteplayback|formnovalidate|hidden|loop|nomodule|novalidate|open|playsinline|readonly|required|reversed|scoped|seamless|selected|itemscope)$/i;
    htmlEnumAttributes = /^(?:contenteditable|draggable|spellcheck|value)$/i;
    svgEnumAttributes = /^(?:autoReverse|externalResourcesRequired|focusable|preserveAlpha)$/i;
    AMPERSAND_REGEX = /&/g;
    DOUBLE_QUOTE_REGEX = /"/g;
    STATIC_DIRECTIVES = /* @__PURE__ */ new Set(["set:html", "set:text"]);
    toIdent = /* @__PURE__ */ __name((k) => k.trim().replace(/(?!^)\b\w|\s+|\W+/g, (match, index) => {
      if (/\W/.test(match))
        return "";
      return index === 0 ? match : match.toUpperCase();
    }), "toIdent");
    toAttributeString = /* @__PURE__ */ __name((value, shouldEscape = true) => shouldEscape ? String(value).replace(AMPERSAND_REGEX, "&#38;").replace(DOUBLE_QUOTE_REGEX, "&#34;") : value, "toAttributeString");
    kebab = /* @__PURE__ */ __name((k) => k.toLowerCase() === k ? k : k.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`), "kebab");
    toStyleString = /* @__PURE__ */ __name((obj) => Object.entries(obj).filter(([_, v]) => typeof v === "string" && v.trim() || typeof v === "number").map(([k, v]) => {
      if (k[0] !== "-" && k[1] !== "-")
        return `${kebab(k)}:${v}`;
      return `${k}:${v}`;
    }).join(";"), "toStyleString");
    __name(defineScriptVars, "defineScriptVars");
    __name(formatList, "formatList");
    __name(addAttribute, "addAttribute");
    __name(internalSpreadAttributes, "internalSpreadAttributes");
    __name(renderElement$1, "renderElement$1");
    noop = /* @__PURE__ */ __name(() => {
    }, "noop");
    BufferedRenderer = class {
      chunks = [];
      renderPromise;
      destination;
      constructor(bufferRenderFunction) {
        this.renderPromise = bufferRenderFunction(this);
        Promise.resolve(this.renderPromise).catch(noop);
      }
      write(chunk) {
        if (this.destination) {
          this.destination.write(chunk);
        } else {
          this.chunks.push(chunk);
        }
      }
      async renderToFinalDestination(destination) {
        for (const chunk of this.chunks) {
          destination.write(chunk);
        }
        this.destination = destination;
        await this.renderPromise;
      }
    };
    __name(BufferedRenderer, "BufferedRenderer");
    __name(renderToBufferDestination, "renderToBufferDestination");
    isNode = typeof process !== "undefined" && Object.prototype.toString.call(process) === "[object process]";
    isDeno = typeof Deno !== "undefined";
    __name(promiseWithResolvers, "promiseWithResolvers");
    VALID_PROTOCOLS = ["http:", "https:"];
    __name(isHttpUrl, "isHttpUrl");
    uniqueElements = /* @__PURE__ */ __name((item, index, all) => {
      const props = JSON.stringify(item.props);
      const children = item.children;
      return index === all.findIndex((i2) => JSON.stringify(i2.props) === props && i2.children == children);
    }, "uniqueElements");
    __name(renderAllHeadContent, "renderAllHeadContent");
    __name(renderHead, "renderHead");
    __name(maybeRenderHead, "maybeRenderHead");
    renderTemplateResultSym = Symbol.for("astro.renderTemplateResult");
    RenderTemplateResult = class {
      [renderTemplateResultSym] = true;
      htmlParts;
      expressions;
      error;
      constructor(htmlParts, expressions) {
        this.htmlParts = htmlParts;
        this.error = void 0;
        this.expressions = expressions.map((expression) => {
          if (isPromise(expression)) {
            return Promise.resolve(expression).catch((err) => {
              if (!this.error) {
                this.error = err;
                throw err;
              }
            });
          }
          return expression;
        });
      }
      async render(destination) {
        const expRenders = this.expressions.map((exp) => {
          return renderToBufferDestination((bufferDestination) => {
            if (exp || exp === 0) {
              return renderChild(bufferDestination, exp);
            }
          });
        });
        for (let i2 = 0; i2 < this.htmlParts.length; i2++) {
          const html6 = this.htmlParts[i2];
          const expRender = expRenders[i2];
          destination.write(markHTMLString(html6));
          if (expRender) {
            await expRender.renderToFinalDestination(destination);
          }
        }
      }
    };
    __name(RenderTemplateResult, "RenderTemplateResult");
    __name(isRenderTemplateResult, "isRenderTemplateResult");
    __name(renderTemplate, "renderTemplate");
    slotString = Symbol.for("astro:slot-string");
    SlotString = class extends HTMLString {
      instructions;
      [slotString];
      constructor(content, instructions) {
        super(content);
        this.instructions = instructions;
        this[slotString] = true;
      }
    };
    __name(SlotString, "SlotString");
    __name(isSlotString, "isSlotString");
    __name(renderSlot, "renderSlot");
    __name(renderSlotToString, "renderSlotToString");
    __name(renderSlots, "renderSlots");
    __name(createSlotValueFromString, "createSlotValueFromString");
    Fragment = Symbol.for("astro:fragment");
    Renderer = Symbol.for("astro:renderer");
    encoder$1 = new TextEncoder();
    decoder$1 = new TextDecoder();
    __name(stringifyChunk, "stringifyChunk");
    __name(chunkToString, "chunkToString");
    __name(chunkToByteArray, "chunkToByteArray");
    __name(isRenderInstance, "isRenderInstance");
    __name(renderChild, "renderChild");
    astroComponentInstanceSym = Symbol.for("astro.componentInstance");
    AstroComponentInstance = class {
      [astroComponentInstanceSym] = true;
      result;
      props;
      slotValues;
      factory;
      returnValue;
      constructor(result, props, slots, factory) {
        this.result = result;
        this.props = props;
        this.factory = factory;
        this.slotValues = {};
        for (const name in slots) {
          let didRender = false;
          let value = slots[name](result);
          this.slotValues[name] = () => {
            if (!didRender) {
              didRender = true;
              return value;
            }
            return slots[name](result);
          };
        }
      }
      async init(result) {
        if (this.returnValue !== void 0)
          return this.returnValue;
        this.returnValue = this.factory(result, this.props, this.slotValues);
        if (isPromise(this.returnValue)) {
          this.returnValue.then((resolved) => {
            this.returnValue = resolved;
          }).catch(() => {
          });
        }
        return this.returnValue;
      }
      async render(destination) {
        const returnValue = await this.init(this.result);
        if (isHeadAndContent(returnValue)) {
          await returnValue.content.render(destination);
        } else {
          await renderChild(destination, returnValue);
        }
      }
    };
    __name(AstroComponentInstance, "AstroComponentInstance");
    __name(validateComponentProps, "validateComponentProps");
    __name(createAstroComponentInstance, "createAstroComponentInstance");
    __name(isAstroComponentInstance, "isAstroComponentInstance");
    DOCTYPE_EXP = /<!doctype html/i;
    __name(renderToString, "renderToString");
    __name(renderToReadableStream, "renderToReadableStream");
    __name(callComponentAsTemplateResultOrResponse, "callComponentAsTemplateResultOrResponse");
    __name(bufferHeadContent, "bufferHeadContent");
    __name(renderToAsyncIterable, "renderToAsyncIterable");
    __name(componentIsHTMLElement, "componentIsHTMLElement");
    __name(renderHTMLElement, "renderHTMLElement");
    __name(getHTMLElementName, "getHTMLElementName");
    __name(encodeHexUpperCase, "encodeHexUpperCase");
    __name(decodeHex, "decodeHex");
    alphabetUpperCase = "0123456789ABCDEF";
    decodeMap = {
      "0": 0,
      "1": 1,
      "2": 2,
      "3": 3,
      "4": 4,
      "5": 5,
      "6": 6,
      "7": 7,
      "8": 8,
      "9": 9,
      a: 10,
      A: 10,
      b: 11,
      B: 11,
      c: 12,
      C: 12,
      d: 13,
      D: 13,
      e: 14,
      E: 14,
      f: 15,
      F: 15
    };
    (function(EncodingPadding2) {
      EncodingPadding2[EncodingPadding2["Include"] = 0] = "Include";
      EncodingPadding2[EncodingPadding2["None"] = 1] = "None";
    })(EncodingPadding$1 || (EncodingPadding$1 = {}));
    (function(DecodingPadding2) {
      DecodingPadding2[DecodingPadding2["Required"] = 0] = "Required";
      DecodingPadding2[DecodingPadding2["Ignore"] = 1] = "Ignore";
    })(DecodingPadding$1 || (DecodingPadding$1 = {}));
    __name(encodeBase64, "encodeBase64");
    __name(encodeBase64_internal, "encodeBase64_internal");
    base64Alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    __name(decodeBase64, "decodeBase64");
    __name(decodeBase64_internal, "decodeBase64_internal");
    (function(EncodingPadding2) {
      EncodingPadding2[EncodingPadding2["Include"] = 0] = "Include";
      EncodingPadding2[EncodingPadding2["None"] = 1] = "None";
    })(EncodingPadding || (EncodingPadding = {}));
    (function(DecodingPadding2) {
      DecodingPadding2[DecodingPadding2["Required"] = 0] = "Required";
      DecodingPadding2[DecodingPadding2["Ignore"] = 1] = "Ignore";
    })(DecodingPadding || (DecodingPadding = {}));
    base64DecodeMap = {
      "0": 52,
      "1": 53,
      "2": 54,
      "3": 55,
      "4": 56,
      "5": 57,
      "6": 58,
      "7": 59,
      "8": 60,
      "9": 61,
      A: 0,
      B: 1,
      C: 2,
      D: 3,
      E: 4,
      F: 5,
      G: 6,
      H: 7,
      I: 8,
      J: 9,
      K: 10,
      L: 11,
      M: 12,
      N: 13,
      O: 14,
      P: 15,
      Q: 16,
      R: 17,
      S: 18,
      T: 19,
      U: 20,
      V: 21,
      W: 22,
      X: 23,
      Y: 24,
      Z: 25,
      a: 26,
      b: 27,
      c: 28,
      d: 29,
      e: 30,
      f: 31,
      g: 32,
      h: 33,
      i: 34,
      j: 35,
      k: 36,
      l: 37,
      m: 38,
      n: 39,
      o: 40,
      p: 41,
      q: 42,
      r: 43,
      s: 44,
      t: 45,
      u: 46,
      v: 47,
      w: 48,
      x: 49,
      y: 50,
      z: 51,
      "+": 62,
      "/": 63
    };
    ALGORITHM = "AES-GCM";
    __name(decodeKey, "decodeKey");
    encoder = new TextEncoder();
    decoder = new TextDecoder();
    IV_LENGTH = 24;
    __name(encryptString, "encryptString");
    __name(decryptString, "decryptString");
    internalProps = /* @__PURE__ */ new Set([
      "server:component-path",
      "server:component-export",
      "server:component-directive",
      "server:defer"
    ]);
    __name(containsServerDirective, "containsServerDirective");
    __name(safeJsonStringify, "safeJsonStringify");
    __name(renderServerIsland, "renderServerIsland");
    needsHeadRenderingSymbol = Symbol.for("astro.needsHeadRendering");
    rendererAliases = /* @__PURE__ */ new Map([["solid", "solid-js"]]);
    clientOnlyValues = /* @__PURE__ */ new Set(["solid-js", "react", "preact", "vue", "svelte", "lit"]);
    __name(guessRenderers, "guessRenderers");
    __name(isFragmentComponent, "isFragmentComponent");
    __name(isHTMLComponent, "isHTMLComponent");
    ASTRO_SLOT_EXP = /<\/?astro-slot\b[^>]*>/g;
    ASTRO_STATIC_SLOT_EXP = /<\/?astro-static-slot\b[^>]*>/g;
    __name(removeStaticAstroSlot, "removeStaticAstroSlot");
    __name(renderFrameworkComponent, "renderFrameworkComponent");
    __name(sanitizeElementName, "sanitizeElementName");
    __name(renderFragmentComponent, "renderFragmentComponent");
    __name(renderHTMLComponent, "renderHTMLComponent");
    __name(renderAstroComponent, "renderAstroComponent");
    __name(renderComponent, "renderComponent");
    __name(normalizeProps, "normalizeProps");
    __name(renderComponentToString, "renderComponentToString");
    __name(nonAstroPageNeedsHeadInjection, "nonAstroPageNeedsHeadInjection");
    ClientOnlyPlaceholder = "astro-client-only";
    hasTriedRenderComponentSymbol = Symbol("hasTriedRenderComponent");
    __name(renderJSX, "renderJSX");
    __name(renderJSXVNode, "renderJSXVNode");
    __name(renderElement, "renderElement");
    __name(prerenderElementChildren, "prerenderElementChildren");
    __name(renderPage, "renderPage");
    __name(renderScriptElement, "renderScriptElement");
    __name(renderUniqueStylesheet, "renderUniqueStylesheet");
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_".split("").reduce((v, c2) => (v[c2.charCodeAt(0)] = c2, v), []);
    "-0123456789_".split("").reduce((v, c2) => (v[c2.charCodeAt(0)] = c2, v), []);
    __name(spreadAttributes, "spreadAttributes");
  }
});

// dist/_worker.js/chunks/astro-designed-error-pages_BHdqSjjW.mjs
function isActionError(error2) {
  return typeof error2 === "object" && error2 != null && "type" in error2 && error2.type === "AstroActionError";
}
function isInputError(error2) {
  return typeof error2 === "object" && error2 != null && "type" in error2 && error2.type === "AstroActionInputError" && "issues" in error2 && Array.isArray(error2.issues);
}
function getActionQueryString(name) {
  const searchParams = new URLSearchParams({ [ACTION_QUERY_PARAMS.actionName]: name });
  return `?${searchParams.toString()}`;
}
function deserializeActionResult(res) {
  if (res.type === "error") {
    let json;
    try {
      json = JSON.parse(res.body);
    } catch {
      return {
        data: void 0,
        error: new ActionError({
          message: res.body,
          code: "INTERNAL_SERVER_ERROR"
        })
      };
    }
    if (Object.assign(__vite_import_meta_env__, { _: process.env._ })?.PROD) {
      return { error: ActionError.fromJson(json), data: void 0 };
    } else {
      const error2 = ActionError.fromJson(json);
      error2.stack = actionResultErrorStack.get();
      return {
        error: error2,
        data: void 0
      };
    }
  }
  if (res.type === "empty") {
    return { data: void 0, error: void 0 };
  }
  return {
    data: parse(res.body, {
      URL: (href) => new URL(href)
    }),
    error: void 0
  };
}
function template({
  title,
  pathname,
  statusCode = 404,
  tabTitle,
  body: body6
}) {
  return `<!doctype html>
<html lang="en">
	<head>
		<meta charset="UTF-8">
		<title>${tabTitle}</title>
		<style>
			:root {
				--gray-10: hsl(258, 7%, 10%);
				--gray-20: hsl(258, 7%, 20%);
				--gray-30: hsl(258, 7%, 30%);
				--gray-40: hsl(258, 7%, 40%);
				--gray-50: hsl(258, 7%, 50%);
				--gray-60: hsl(258, 7%, 60%);
				--gray-70: hsl(258, 7%, 70%);
				--gray-80: hsl(258, 7%, 80%);
				--gray-90: hsl(258, 7%, 90%);
				--black: #13151A;
				--accent-light: #E0CCFA;
			}

			* {
				box-sizing: border-box;
			}

			html {
				background: var(--black);
				color-scheme: dark;
				accent-color: var(--accent-light);
			}

			body {
				background-color: var(--gray-10);
				color: var(--gray-80);
				font-family: ui-monospace, Menlo, Monaco, "Cascadia Mono", "Segoe UI Mono", "Roboto Mono", "Oxygen Mono", "Ubuntu Monospace", "Source Code Pro", "Fira Mono", "Droid Sans Mono", "Courier New", monospace;
				line-height: 1.5;
				margin: 0;
			}

			a {
				color: var(--accent-light);
			}

			.center {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				height: 100vh;
				width: 100vw;
			}

			h1 {
				margin-bottom: 8px;
				color: white;
				font-family: system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
				font-weight: 700;
				margin-top: 1rem;
				margin-bottom: 0;
			}

			.statusCode {
				color: var(--accent-light);
			}

			.astro-icon {
				height: 124px;
				width: 124px;
			}

			pre, code {
				padding: 2px 8px;
				background: rgba(0,0,0, 0.25);
				border: 1px solid rgba(255,255,255, 0.25);
				border-radius: 4px;
				font-size: 1.2em;
				margin-top: 0;
				max-width: 60em;
			}
		</style>
	</head>
	<body>
		<main class="center">
			<svg class="astro-icon" xmlns="http://www.w3.org/2000/svg" width="64" height="80" viewBox="0 0 64 80" fill="none"> <path d="M20.5253 67.6322C16.9291 64.3531 15.8793 57.4632 17.3776 52.4717C19.9755 55.6188 23.575 56.6157 27.3035 57.1784C33.0594 58.0468 38.7122 57.722 44.0592 55.0977C44.6709 54.7972 45.2362 54.3978 45.9045 53.9931C46.4062 55.4451 46.5368 56.9109 46.3616 58.4028C45.9355 62.0362 44.1228 64.8429 41.2397 66.9705C40.0868 67.8215 38.8669 68.5822 37.6762 69.3846C34.0181 71.8508 33.0285 74.7426 34.403 78.9491C34.4357 79.0516 34.4649 79.1541 34.5388 79.4042C32.6711 78.5705 31.3069 77.3565 30.2674 75.7604C29.1694 74.0757 28.6471 72.2121 28.6196 70.1957C28.6059 69.2144 28.6059 68.2244 28.4736 67.257C28.1506 64.8985 27.0406 63.8425 24.9496 63.7817C22.8036 63.7192 21.106 65.0426 20.6559 67.1268C20.6215 67.2865 20.5717 67.4446 20.5218 67.6304L20.5253 67.6322Z" fill="white"/> <path d="M20.5253 67.6322C16.9291 64.3531 15.8793 57.4632 17.3776 52.4717C19.9755 55.6188 23.575 56.6157 27.3035 57.1784C33.0594 58.0468 38.7122 57.722 44.0592 55.0977C44.6709 54.7972 45.2362 54.3978 45.9045 53.9931C46.4062 55.4451 46.5368 56.9109 46.3616 58.4028C45.9355 62.0362 44.1228 64.8429 41.2397 66.9705C40.0868 67.8215 38.8669 68.5822 37.6762 69.3846C34.0181 71.8508 33.0285 74.7426 34.403 78.9491C34.4357 79.0516 34.4649 79.1541 34.5388 79.4042C32.6711 78.5705 31.3069 77.3565 30.2674 75.7604C29.1694 74.0757 28.6471 72.2121 28.6196 70.1957C28.6059 69.2144 28.6059 68.2244 28.4736 67.257C28.1506 64.8985 27.0406 63.8425 24.9496 63.7817C22.8036 63.7192 21.106 65.0426 20.6559 67.1268C20.6215 67.2865 20.5717 67.4446 20.5218 67.6304L20.5253 67.6322Z" fill="url(#paint0_linear_738_686)"/> <path d="M0 51.6401C0 51.6401 10.6488 46.4654 21.3274 46.4654L29.3786 21.6102C29.6801 20.4082 30.5602 19.5913 31.5538 19.5913C32.5474 19.5913 33.4275 20.4082 33.7289 21.6102L41.7802 46.4654C54.4274 46.4654 63.1076 51.6401 63.1076 51.6401C63.1076 51.6401 45.0197 2.48776 44.9843 2.38914C44.4652 0.935933 43.5888 0 42.4073 0H20.7022C19.5206 0 18.6796 0.935933 18.1251 2.38914C18.086 2.4859 0 51.6401 0 51.6401Z" fill="white"/> <defs> <linearGradient id="paint0_linear_738_686" x1="31.554" y1="75.4423" x2="39.7462" y2="48.376" gradientUnits="userSpaceOnUse"> <stop stop-color="#D83333"/> <stop offset="1" stop-color="#F041FF"/> </linearGradient> </defs> </svg>
			<h1>${statusCode ? `<span class="statusCode">${statusCode}: </span> ` : ""}<span class="statusMessage">${title}</span></h1>
			${body6 || `
				<pre>Path: ${escape(pathname)}</pre>
			`}
			</main>
	</body>
</html>`;
}
function ensure404Route(manifest2) {
  if (!manifest2.routes.some((route) => route.route === "/404")) {
    manifest2.routes.push(DEFAULT_404_ROUTE);
  }
  return manifest2;
}
async function default404Page({ pathname }) {
  return new Response(
    template({
      statusCode: 404,
      title: "Not found",
      tabTitle: "404: Not Found",
      pathname
    }),
    { status: 404, headers: { "Content-Type": "text/html; charset=utf-8" } }
  );
}
var ImportType, E, ACTION_QUERY_PARAMS, __vite_import_meta_env__, codeToStatusMap, statusToCodeMap, ActionError, ActionInputError, actionResultErrorStack, DEFAULT_404_ROUTE, default404Instance;
var init_astro_designed_error_pages_BHdqSjjW = __esm({
  "dist/_worker.js/chunks/astro-designed-error-pages_BHdqSjjW.mjs"() {
    "use strict";
    init_checked_fetch();
    init_modules_watch_stub();
    init_parse_B89E6tSO();
    init_server_Den36nYv();
    globalThis.process ??= {};
    globalThis.process.env ??= {};
    !function(A) {
      A[A.Static = 1] = "Static", A[A.Dynamic = 2] = "Dynamic", A[A.ImportMeta = 3] = "ImportMeta", A[A.StaticSourcePhase = 4] = "StaticSourcePhase", A[A.DynamicSourcePhase = 5] = "DynamicSourcePhase";
    }(ImportType || (ImportType = {}));
    1 === new Uint8Array(new Uint16Array([1]).buffer)[0];
    WebAssembly.compile((E = "AGFzbQEAAAABKwhgAX8Bf2AEf39/fwBgAAF/YAAAYAF/AGADf39/AX9gAn9/AX9gA39/fwADMTAAAQECAgICAgICAgICAgICAgICAgIAAwMDBAQAAAUAAAAAAAMDAwAGAAAABwAGAgUEBQFwAQEBBQMBAAEGDwJ/AUHA8gALfwBBwPIACwd6FQZtZW1vcnkCAAJzYQAAAWUAAwJpcwAEAmllAAUCc3MABgJzZQAHAml0AAgCYWkACQJpZAAKAmlwAAsCZXMADAJlZQANA2VscwAOA2VsZQAPAnJpABACcmUAEQFmABICbXMAEwVwYXJzZQAUC19faGVhcF9iYXNlAwEKm0EwaAEBf0EAIAA2AoAKQQAoAtwJIgEgAEEBdGoiAEEAOwEAQQAgAEECaiIANgKECkEAIAA2AogKQQBBADYC4AlBAEEANgLwCUEAQQA2AugJQQBBADYC5AlBAEEANgL4CUEAQQA2AuwJIAEL0wEBA39BACgC8AkhBEEAQQAoAogKIgU2AvAJQQAgBDYC9AlBACAFQSRqNgKICiAEQSBqQeAJIAQbIAU2AgBBACgC1AkhBEEAKALQCSEGIAUgATYCACAFIAA2AgggBSACIAJBAmpBACAGIANGIgAbIAQgA0YiBBs2AgwgBSADNgIUIAVBADYCECAFIAI2AgQgBUEANgIgIAVBA0EBQQIgABsgBBs2AhwgBUEAKALQCSADRiICOgAYAkACQCACDQBBACgC1AkgA0cNAQtBAEEBOgCMCgsLXgEBf0EAKAL4CSIEQRBqQeQJIAQbQQAoAogKIgQ2AgBBACAENgL4CUEAIARBFGo2AogKQQBBAToAjAogBEEANgIQIAQgAzYCDCAEIAI2AgggBCABNgIEIAQgADYCAAsIAEEAKAKQCgsVAEEAKALoCSgCAEEAKALcCWtBAXULHgEBf0EAKALoCSgCBCIAQQAoAtwJa0EBdUF/IAAbCxUAQQAoAugJKAIIQQAoAtwJa0EBdQseAQF/QQAoAugJKAIMIgBBACgC3AlrQQF1QX8gABsLCwBBACgC6AkoAhwLHgEBf0EAKALoCSgCECIAQQAoAtwJa0EBdUF/IAAbCzsBAX8CQEEAKALoCSgCFCIAQQAoAtAJRw0AQX8PCwJAIABBACgC1AlHDQBBfg8LIABBACgC3AlrQQF1CwsAQQAoAugJLQAYCxUAQQAoAuwJKAIAQQAoAtwJa0EBdQsVAEEAKALsCSgCBEEAKALcCWtBAXULHgEBf0EAKALsCSgCCCIAQQAoAtwJa0EBdUF/IAAbCx4BAX9BACgC7AkoAgwiAEEAKALcCWtBAXVBfyAAGwslAQF/QQBBACgC6AkiAEEgakHgCSAAGygCACIANgLoCSAAQQBHCyUBAX9BAEEAKALsCSIAQRBqQeQJIAAbKAIAIgA2AuwJIABBAEcLCABBAC0AlAoLCABBAC0AjAoL3Q0BBX8jAEGA0ABrIgAkAEEAQQE6AJQKQQBBACgC2Ak2ApwKQQBBACgC3AlBfmoiATYCsApBACABQQAoAoAKQQF0aiICNgK0CkEAQQA6AIwKQQBBADsBlgpBAEEAOwGYCkEAQQA6AKAKQQBBADYCkApBAEEAOgD8CUEAIABBgBBqNgKkCkEAIAA2AqgKQQBBADoArAoCQAJAAkACQANAQQAgAUECaiIDNgKwCiABIAJPDQECQCADLwEAIgJBd2pBBUkNAAJAAkACQAJAAkAgAkGbf2oOBQEICAgCAAsgAkEgRg0EIAJBL0YNAyACQTtGDQIMBwtBAC8BmAoNASADEBVFDQEgAUEEakGCCEEKEC8NARAWQQAtAJQKDQFBAEEAKAKwCiIBNgKcCgwHCyADEBVFDQAgAUEEakGMCEEKEC8NABAXC0EAQQAoArAKNgKcCgwBCwJAIAEvAQQiA0EqRg0AIANBL0cNBBAYDAELQQEQGQtBACgCtAohAkEAKAKwCiEBDAALC0EAIQIgAyEBQQAtAPwJDQIMAQtBACABNgKwCkEAQQA6AJQKCwNAQQAgAUECaiIDNgKwCgJAAkACQAJAAkACQAJAIAFBACgCtApPDQAgAy8BACICQXdqQQVJDQYCQAJAAkACQAJAAkACQAJAAkACQCACQWBqDgoQDwYPDw8PBQECAAsCQAJAAkACQCACQaB/ag4KCxISAxIBEhISAgALIAJBhX9qDgMFEQYJC0EALwGYCg0QIAMQFUUNECABQQRqQYIIQQoQLw0QEBYMEAsgAxAVRQ0PIAFBBGpBjAhBChAvDQ8QFwwPCyADEBVFDQ4gASkABELsgISDsI7AOVINDiABLwEMIgNBd2oiAUEXSw0MQQEgAXRBn4CABHFFDQwMDQtBAEEALwGYCiIBQQFqOwGYCkEAKAKkCiABQQN0aiIBQQE2AgAgAUEAKAKcCjYCBAwNC0EALwGYCiIDRQ0JQQAgA0F/aiIDOwGYCkEALwGWCiICRQ0MQQAoAqQKIANB//8DcUEDdGooAgBBBUcNDAJAIAJBAnRBACgCqApqQXxqKAIAIgMoAgQNACADQQAoApwKQQJqNgIEC0EAIAJBf2o7AZYKIAMgAUEEajYCDAwMCwJAQQAoApwKIgEvAQBBKUcNAEEAKALwCSIDRQ0AIAMoAgQgAUcNAEEAQQAoAvQJIgM2AvAJAkAgA0UNACADQQA2AiAMAQtBAEEANgLgCQtBAEEALwGYCiIDQQFqOwGYCkEAKAKkCiADQQN0aiIDQQZBAkEALQCsChs2AgAgAyABNgIEQQBBADoArAoMCwtBAC8BmAoiAUUNB0EAIAFBf2oiATsBmApBACgCpAogAUH//wNxQQN0aigCAEEERg0EDAoLQScQGgwJC0EiEBoMCAsgAkEvRw0HAkACQCABLwEEIgFBKkYNACABQS9HDQEQGAwKC0EBEBkMCQsCQAJAAkACQEEAKAKcCiIBLwEAIgMQG0UNAAJAAkAgA0FVag4EAAkBAwkLIAFBfmovAQBBK0YNAwwICyABQX5qLwEAQS1GDQIMBwsgA0EpRw0BQQAoAqQKQQAvAZgKIgJBA3RqKAIEEBxFDQIMBgsgAUF+ai8BAEFQakH//wNxQQpPDQULQQAvAZgKIQILAkACQCACQf//A3EiAkUNACADQeYARw0AQQAoAqQKIAJBf2pBA3RqIgQoAgBBAUcNACABQX5qLwEAQe8ARw0BIAQoAgRBlghBAxAdRQ0BDAULIANB/QBHDQBBACgCpAogAkEDdGoiAigCBBAeDQQgAigCAEEGRg0ECyABEB8NAyADRQ0DIANBL0ZBAC0AoApBAEdxDQMCQEEAKAL4CSICRQ0AIAEgAigCAEkNACABIAIoAgRNDQQLIAFBfmohAUEAKALcCSECAkADQCABQQJqIgQgAk0NAUEAIAE2ApwKIAEvAQAhAyABQX5qIgQhASADECBFDQALIARBAmohBAsCQCADQf//A3EQIUUNACAEQX5qIQECQANAIAFBAmoiAyACTQ0BQQAgATYCnAogAS8BACEDIAFBfmoiBCEBIAMQIQ0ACyAEQQJqIQMLIAMQIg0EC0EAQQE6AKAKDAcLQQAoAqQKQQAvAZgKIgFBA3QiA2pBACgCnAo2AgRBACABQQFqOwGYCkEAKAKkCiADakEDNgIACxAjDAULQQAtAPwJQQAvAZYKQQAvAZgKcnJFIQIMBwsQJEEAQQA6AKAKDAMLECVBACECDAULIANBoAFHDQELQQBBAToArAoLQQBBACgCsAo2ApwKC0EAKAKwCiEBDAALCyAAQYDQAGokACACCxoAAkBBACgC3AkgAEcNAEEBDwsgAEF+ahAmC/4KAQZ/QQBBACgCsAoiAEEMaiIBNgKwCkEAKAL4CSECQQEQKSEDAkACQAJAAkACQAJAAkACQAJAQQAoArAKIgQgAUcNACADEChFDQELAkACQAJAAkACQAJAAkAgA0EqRg0AIANB+wBHDQFBACAEQQJqNgKwCkEBECkhA0EAKAKwCiEEA0ACQAJAIANB//8DcSIDQSJGDQAgA0EnRg0AIAMQLBpBACgCsAohAwwBCyADEBpBAEEAKAKwCkECaiIDNgKwCgtBARApGgJAIAQgAxAtIgNBLEcNAEEAQQAoArAKQQJqNgKwCkEBECkhAwsgA0H9AEYNA0EAKAKwCiIFIARGDQ8gBSEEIAVBACgCtApNDQAMDwsLQQAgBEECajYCsApBARApGkEAKAKwCiIDIAMQLRoMAgtBAEEAOgCUCgJAAkACQAJAAkACQCADQZ9/ag4MAgsEAQsDCwsLCwsFAAsgA0H2AEYNBAwKC0EAIARBDmoiAzYCsAoCQAJAAkBBARApQZ9/ag4GABICEhIBEgtBACgCsAoiBSkAAkLzgOSD4I3AMVINESAFLwEKECFFDRFBACAFQQpqNgKwCkEAECkaC0EAKAKwCiIFQQJqQbIIQQ4QLw0QIAUvARAiAkF3aiIBQRdLDQ1BASABdEGfgIAEcUUNDQwOC0EAKAKwCiIFKQACQuyAhIOwjsA5Ug0PIAUvAQoiAkF3aiIBQRdNDQYMCgtBACAEQQpqNgKwCkEAECkaQQAoArAKIQQLQQAgBEEQajYCsAoCQEEBECkiBEEqRw0AQQBBACgCsApBAmo2ArAKQQEQKSEEC0EAKAKwCiEDIAQQLBogA0EAKAKwCiIEIAMgBBACQQBBACgCsApBfmo2ArAKDwsCQCAEKQACQuyAhIOwjsA5Ug0AIAQvAQoQIEUNAEEAIARBCmo2ArAKQQEQKSEEQQAoArAKIQMgBBAsGiADQQAoArAKIgQgAyAEEAJBAEEAKAKwCkF+ajYCsAoPC0EAIARBBGoiBDYCsAoLQQAgBEEGajYCsApBAEEAOgCUCkEBECkhBEEAKAKwCiEDIAQQLCEEQQAoArAKIQIgBEHf/wNxIgFB2wBHDQNBACACQQJqNgKwCkEBECkhBUEAKAKwCiEDQQAhBAwEC0EAQQE6AIwKQQBBACgCsApBAmo2ArAKC0EBECkhBEEAKAKwCiEDAkAgBEHmAEcNACADQQJqQawIQQYQLw0AQQAgA0EIajYCsAogAEEBEClBABArIAJBEGpB5AkgAhshAwNAIAMoAgAiA0UNBSADQgA3AgggA0EQaiEDDAALC0EAIANBfmo2ArAKDAMLQQEgAXRBn4CABHFFDQMMBAtBASEECwNAAkACQCAEDgIAAQELIAVB//8DcRAsGkEBIQQMAQsCQAJAQQAoArAKIgQgA0YNACADIAQgAyAEEAJBARApIQQCQCABQdsARw0AIARBIHJB/QBGDQQLQQAoArAKIQMCQCAEQSxHDQBBACADQQJqNgKwCkEBECkhBUEAKAKwCiEDIAVBIHJB+wBHDQILQQAgA0F+ajYCsAoLIAFB2wBHDQJBACACQX5qNgKwCg8LQQAhBAwACwsPCyACQaABRg0AIAJB+wBHDQQLQQAgBUEKajYCsApBARApIgVB+wBGDQMMAgsCQCACQVhqDgMBAwEACyACQaABRw0CC0EAIAVBEGo2ArAKAkBBARApIgVBKkcNAEEAQQAoArAKQQJqNgKwCkEBECkhBQsgBUEoRg0BC0EAKAKwCiEBIAUQLBpBACgCsAoiBSABTQ0AIAQgAyABIAUQAkEAQQAoArAKQX5qNgKwCg8LIAQgA0EAQQAQAkEAIARBDGo2ArAKDwsQJQvcCAEGf0EAIQBBAEEAKAKwCiIBQQxqIgI2ArAKQQEQKSEDQQAoArAKIQQCQAJAAkACQAJAAkACQAJAIANBLkcNAEEAIARBAmo2ArAKAkBBARApIgNB8wBGDQAgA0HtAEcNB0EAKAKwCiIDQQJqQZwIQQYQLw0HAkBBACgCnAoiBBAqDQAgBC8BAEEuRg0ICyABIAEgA0EIakEAKALUCRABDwtBACgCsAoiA0ECakGiCEEKEC8NBgJAQQAoApwKIgQQKg0AIAQvAQBBLkYNBwsgA0EMaiEDDAELIANB8wBHDQEgBCACTQ0BQQYhAEEAIQIgBEECakGiCEEKEC8NAiAEQQxqIQMCQCAELwEMIgVBd2oiBEEXSw0AQQEgBHRBn4CABHENAQsgBUGgAUcNAgtBACADNgKwCkEBIQBBARApIQMLAkACQAJAAkAgA0H7AEYNACADQShHDQFBACgCpApBAC8BmAoiA0EDdGoiBEEAKAKwCjYCBEEAIANBAWo7AZgKIARBBTYCAEEAKAKcCi8BAEEuRg0HQQBBACgCsAoiBEECajYCsApBARApIQMgAUEAKAKwCkEAIAQQAQJAAkAgAA0AQQAoAvAJIQQMAQtBACgC8AkiBEEFNgIcC0EAQQAvAZYKIgBBAWo7AZYKQQAoAqgKIABBAnRqIAQ2AgACQCADQSJGDQAgA0EnRg0AQQBBACgCsApBfmo2ArAKDwsgAxAaQQBBACgCsApBAmoiAzYCsAoCQAJAAkBBARApQVdqDgQBAgIAAgtBAEEAKAKwCkECajYCsApBARApGkEAKALwCSIEIAM2AgQgBEEBOgAYIARBACgCsAoiAzYCEEEAIANBfmo2ArAKDwtBACgC8AkiBCADNgIEIARBAToAGEEAQQAvAZgKQX9qOwGYCiAEQQAoArAKQQJqNgIMQQBBAC8BlgpBf2o7AZYKDwtBAEEAKAKwCkF+ajYCsAoPCyAADQJBACgCsAohA0EALwGYCg0BA0ACQAJAAkAgA0EAKAK0Ck8NAEEBECkiA0EiRg0BIANBJ0YNASADQf0ARw0CQQBBACgCsApBAmo2ArAKC0EBECkhBEEAKAKwCiEDAkAgBEHmAEcNACADQQJqQawIQQYQLw0JC0EAIANBCGo2ArAKAkBBARApIgNBIkYNACADQSdHDQkLIAEgA0EAECsPCyADEBoLQQBBACgCsApBAmoiAzYCsAoMAAsLIAANAUEGIQBBACECAkAgA0FZag4EBAMDBAALIANBIkYNAwwCC0EAIANBfmo2ArAKDwtBDCEAQQEhAgtBACgCsAoiAyABIABBAXRqRw0AQQAgA0F+ajYCsAoPC0EALwGYCg0CQQAoArAKIQNBACgCtAohAANAIAMgAE8NAQJAAkAgAy8BACIEQSdGDQAgBEEiRw0BCyABIAQgAhArDwtBACADQQJqIgM2ArAKDAALCxAlCw8LQQBBACgCsApBfmo2ArAKC0cBA39BACgCsApBAmohAEEAKAK0CiEBAkADQCAAIgJBfmogAU8NASACQQJqIQAgAi8BAEF2ag4EAQAAAQALC0EAIAI2ArAKC5gBAQN/QQBBACgCsAoiAUECajYCsAogAUEGaiEBQQAoArQKIQIDQAJAAkACQCABQXxqIAJPDQAgAUF+ai8BACEDAkACQCAADQAgA0EqRg0BIANBdmoOBAIEBAIECyADQSpHDQMLIAEvAQBBL0cNAkEAIAFBfmo2ArAKDAELIAFBfmohAQtBACABNgKwCg8LIAFBAmohAQwACwuIAQEEf0EAKAKwCiEBQQAoArQKIQICQAJAA0AgASIDQQJqIQEgAyACTw0BIAEvAQAiBCAARg0CAkAgBEHcAEYNACAEQXZqDgQCAQECAQsgA0EEaiEBIAMvAQRBDUcNACADQQZqIAEgAy8BBkEKRhshAQwACwtBACABNgKwChAlDwtBACABNgKwCgtsAQF/AkACQCAAQV9qIgFBBUsNAEEBIAF0QTFxDQELIABBRmpB//8DcUEGSQ0AIABBKUcgAEFYakH//wNxQQdJcQ0AAkAgAEGlf2oOBAEAAAEACyAAQf0ARyAAQYV/akH//wNxQQRJcQ8LQQELLgEBf0EBIQECQCAAQaYJQQUQHQ0AIABBlghBAxAdDQAgAEGwCUECEB0hAQsgAQtGAQN/QQAhAwJAIAAgAkEBdCICayIEQQJqIgBBACgC3AkiBUkNACAAIAEgAhAvDQACQCAAIAVHDQBBAQ8LIAQQJiEDCyADC4MBAQJ/QQEhAQJAAkACQAJAAkACQCAALwEAIgJBRWoOBAUEBAEACwJAIAJBm39qDgQDBAQCAAsgAkEpRg0EIAJB+QBHDQMgAEF+akG8CUEGEB0PCyAAQX5qLwEAQT1GDwsgAEF+akG0CUEEEB0PCyAAQX5qQcgJQQMQHQ8LQQAhAQsgAQu0AwECf0EAIQECQAJAAkACQAJAAkACQAJAAkACQCAALwEAQZx/ag4UAAECCQkJCQMJCQQFCQkGCQcJCQgJCwJAAkAgAEF+ai8BAEGXf2oOBAAKCgEKCyAAQXxqQcoIQQIQHQ8LIABBfGpBzghBAxAdDwsCQAJAAkAgAEF+ai8BAEGNf2oOAwABAgoLAkAgAEF8ai8BACICQeEARg0AIAJB7ABHDQogAEF6akHlABAnDwsgAEF6akHjABAnDwsgAEF8akHUCEEEEB0PCyAAQXxqQdwIQQYQHQ8LIABBfmovAQBB7wBHDQYgAEF8ai8BAEHlAEcNBgJAIABBemovAQAiAkHwAEYNACACQeMARw0HIABBeGpB6AhBBhAdDwsgAEF4akH0CEECEB0PCyAAQX5qQfgIQQQQHQ8LQQEhASAAQX5qIgBB6QAQJw0EIABBgAlBBRAdDwsgAEF+akHkABAnDwsgAEF+akGKCUEHEB0PCyAAQX5qQZgJQQQQHQ8LAkAgAEF+ai8BACICQe8ARg0AIAJB5QBHDQEgAEF8akHuABAnDwsgAEF8akGgCUEDEB0hAQsgAQs0AQF/QQEhAQJAIABBd2pB//8DcUEFSQ0AIABBgAFyQaABRg0AIABBLkcgABAocSEBCyABCzABAX8CQAJAIABBd2oiAUEXSw0AQQEgAXRBjYCABHENAQsgAEGgAUYNAEEADwtBAQtOAQJ/QQAhAQJAAkAgAC8BACICQeUARg0AIAJB6wBHDQEgAEF+akH4CEEEEB0PCyAAQX5qLwEAQfUARw0AIABBfGpB3AhBBhAdIQELIAEL3gEBBH9BACgCsAohAEEAKAK0CiEBAkACQAJAA0AgACICQQJqIQAgAiABTw0BAkACQAJAIAAvAQAiA0Gkf2oOBQIDAwMBAAsgA0EkRw0CIAIvAQRB+wBHDQJBACACQQRqIgA2ArAKQQBBAC8BmAoiAkEBajsBmApBACgCpAogAkEDdGoiAkEENgIAIAIgADYCBA8LQQAgADYCsApBAEEALwGYCkF/aiIAOwGYCkEAKAKkCiAAQf//A3FBA3RqKAIAQQNHDQMMBAsgAkEEaiEADAALC0EAIAA2ArAKCxAlCwtwAQJ/AkACQANAQQBBACgCsAoiAEECaiIBNgKwCiAAQQAoArQKTw0BAkACQAJAIAEvAQAiAUGlf2oOAgECAAsCQCABQXZqDgQEAwMEAAsgAUEvRw0CDAQLEC4aDAELQQAgAEEEajYCsAoMAAsLECULCzUBAX9BAEEBOgD8CUEAKAKwCiEAQQBBACgCtApBAmo2ArAKQQAgAEEAKALcCWtBAXU2ApAKC0MBAn9BASEBAkAgAC8BACICQXdqQf//A3FBBUkNACACQYABckGgAUYNAEEAIQEgAhAoRQ0AIAJBLkcgABAqcg8LIAELPQECf0EAIQICQEEAKALcCSIDIABLDQAgAC8BACABRw0AAkAgAyAARw0AQQEPCyAAQX5qLwEAECAhAgsgAgtoAQJ/QQEhAQJAAkAgAEFfaiICQQVLDQBBASACdEExcQ0BCyAAQfj/A3FBKEYNACAAQUZqQf//A3FBBkkNAAJAIABBpX9qIgJBA0sNACACQQFHDQELIABBhX9qQf//A3FBBEkhAQsgAQucAQEDf0EAKAKwCiEBAkADQAJAAkAgAS8BACICQS9HDQACQCABLwECIgFBKkYNACABQS9HDQQQGAwCCyAAEBkMAQsCQAJAIABFDQAgAkF3aiIBQRdLDQFBASABdEGfgIAEcUUNAQwCCyACECFFDQMMAQsgAkGgAUcNAgtBAEEAKAKwCiIDQQJqIgE2ArAKIANBACgCtApJDQALCyACCzEBAX9BACEBAkAgAC8BAEEuRw0AIABBfmovAQBBLkcNACAAQXxqLwEAQS5GIQELIAELnAQBAX8CQCABQSJGDQAgAUEnRg0AECUPC0EAKAKwCiEDIAEQGiAAIANBAmpBACgCsApBACgC0AkQAQJAIAJFDQBBACgC8AlBBDYCHAtBAEEAKAKwCkECajYCsAoCQAJAAkACQEEAECkiAUHhAEYNACABQfcARg0BQQAoArAKIQEMAgtBACgCsAoiAUECakHACEEKEC8NAUEGIQAMAgtBACgCsAoiAS8BAkHpAEcNACABLwEEQfQARw0AQQQhACABLwEGQegARg0BC0EAIAFBfmo2ArAKDwtBACABIABBAXRqNgKwCgJAQQEQKUH7AEYNAEEAIAE2ArAKDwtBACgCsAoiAiEAA0BBACAAQQJqNgKwCgJAAkACQEEBECkiAEEiRg0AIABBJ0cNAUEnEBpBAEEAKAKwCkECajYCsApBARApIQAMAgtBIhAaQQBBACgCsApBAmo2ArAKQQEQKSEADAELIAAQLCEACwJAIABBOkYNAEEAIAE2ArAKDwtBAEEAKAKwCkECajYCsAoCQEEBECkiAEEiRg0AIABBJ0YNAEEAIAE2ArAKDwsgABAaQQBBACgCsApBAmo2ArAKAkACQEEBECkiAEEsRg0AIABB/QBGDQFBACABNgKwCg8LQQBBACgCsApBAmo2ArAKQQEQKUH9AEYNAEEAKAKwCiEADAELC0EAKALwCSIBIAI2AhAgAUEAKAKwCkECajYCDAttAQJ/AkACQANAAkAgAEH//wNxIgFBd2oiAkEXSw0AQQEgAnRBn4CABHENAgsgAUGgAUYNASAAIQIgARAoDQJBACECQQBBACgCsAoiAEECajYCsAogAC8BAiIADQAMAgsLIAAhAgsgAkH//wNxC6sBAQR/AkACQEEAKAKwCiICLwEAIgNB4QBGDQAgASEEIAAhBQwBC0EAIAJBBGo2ArAKQQEQKSECQQAoArAKIQUCQAJAIAJBIkYNACACQSdGDQAgAhAsGkEAKAKwCiEEDAELIAIQGkEAQQAoArAKQQJqIgQ2ArAKC0EBECkhA0EAKAKwCiECCwJAIAIgBUYNACAFIARBACAAIAAgAUYiAhtBACABIAIbEAILIAMLcgEEf0EAKAKwCiEAQQAoArQKIQECQAJAA0AgAEECaiECIAAgAU8NAQJAAkAgAi8BACIDQaR/ag4CAQQACyACIQAgA0F2ag4EAgEBAgELIABBBGohAAwACwtBACACNgKwChAlQQAPC0EAIAI2ArAKQd0AC0kBA39BACEDAkAgAkUNAAJAA0AgAC0AACIEIAEtAAAiBUcNASABQQFqIQEgAEEBaiEAIAJBf2oiAg0ADAILCyAEIAVrIQMLIAMLC+wBAgBBgAgLzgEAAHgAcABvAHIAdABtAHAAbwByAHQAZgBvAHIAZQB0AGEAbwB1AHIAYwBlAHIAbwBtAHUAbgBjAHQAaQBvAG4AcwBzAGUAcgB0AHYAbwB5AGkAZQBkAGUAbABlAGMAbwBuAHQAaQBuAGkAbgBzAHQAYQBuAHQAeQBiAHIAZQBhAHIAZQB0AHUAcgBkAGUAYgB1AGcAZwBlAGEAdwBhAGkAdABoAHIAdwBoAGkAbABlAGkAZgBjAGEAdABjAGYAaQBuAGEAbABsAGUAbABzAABB0AkLEAEAAAACAAAAAAQAAEA5AAA=", "undefined" != typeof Buffer ? Buffer.from(E, "base64") : Uint8Array.from(atob(E), (A) => A.charCodeAt(0)))).then(WebAssembly.instantiate).then(({ exports: A }) => {
    });
    ACTION_QUERY_PARAMS = {
      actionName: "_astroAction",
      actionPayload: "_astroActionPayload",
      actionRedirect: "_astroActionRedirect"
    };
    __vite_import_meta_env__ = { "ASSETS_PREFIX": void 0, "BASE_URL": "/", "DEV": false, "MODE": "production", "PROD": true, "SITE": void 0, "SSR": true };
    codeToStatusMap = {
      // Implemented from tRPC error code table
      // https://trpc.io/docs/server/error-handling#error-codes
      BAD_REQUEST: 400,
      UNAUTHORIZED: 401,
      FORBIDDEN: 403,
      NOT_FOUND: 404,
      TIMEOUT: 405,
      CONFLICT: 409,
      PRECONDITION_FAILED: 412,
      PAYLOAD_TOO_LARGE: 413,
      UNSUPPORTED_MEDIA_TYPE: 415,
      UNPROCESSABLE_CONTENT: 422,
      TOO_MANY_REQUESTS: 429,
      CLIENT_CLOSED_REQUEST: 499,
      INTERNAL_SERVER_ERROR: 500
    };
    statusToCodeMap = Object.entries(codeToStatusMap).reduce(
      // reverse the key-value pairs
      (acc, [key, value]) => ({ ...acc, [value]: key }),
      {}
    );
    ActionError = class extends Error {
      type = "AstroActionError";
      code = "INTERNAL_SERVER_ERROR";
      status = 500;
      constructor(params) {
        super(params.message);
        this.code = params.code;
        this.status = ActionError.codeToStatus(params.code);
        if (params.stack) {
          this.stack = params.stack;
        }
      }
      static codeToStatus(code) {
        return codeToStatusMap[code];
      }
      static statusToCode(status) {
        return statusToCodeMap[status] ?? "INTERNAL_SERVER_ERROR";
      }
      static fromJson(body6) {
        if (isInputError(body6)) {
          return new ActionInputError(body6.issues);
        }
        if (isActionError(body6)) {
          return new ActionError(body6);
        }
        return new ActionError({
          code: "INTERNAL_SERVER_ERROR"
        });
      }
    };
    __name(ActionError, "ActionError");
    __name(isActionError, "isActionError");
    __name(isInputError, "isInputError");
    ActionInputError = class extends ActionError {
      type = "AstroActionInputError";
      // We don't expose all ZodError properties.
      // Not all properties will serialize from server to client,
      // and we don't want to import the full ZodError object into the client.
      issues;
      fields;
      constructor(issues) {
        super({
          message: `Failed to validate: ${JSON.stringify(issues, null, 2)}`,
          code: "BAD_REQUEST"
        });
        this.issues = issues;
        this.fields = {};
        for (const issue of issues) {
          if (issue.path.length > 0) {
            const key = issue.path[0].toString();
            this.fields[key] ??= [];
            this.fields[key]?.push(issue.message);
          }
        }
      }
    };
    __name(ActionInputError, "ActionInputError");
    __name(getActionQueryString, "getActionQueryString");
    __name(deserializeActionResult, "deserializeActionResult");
    actionResultErrorStack = /* @__PURE__ */ (/* @__PURE__ */ __name(function actionResultErrorStackFn() {
      let errorStack;
      return {
        set(stack) {
          errorStack = stack;
        },
        get() {
          return errorStack;
        }
      };
    }, "actionResultErrorStackFn"))();
    __name(template, "template");
    DEFAULT_404_ROUTE = {
      component: DEFAULT_404_COMPONENT,
      generate: () => "",
      params: [],
      pattern: /\/404/,
      prerender: false,
      pathname: "/404",
      segments: [[{ content: "404", dynamic: false, spread: false }]],
      type: "page",
      route: "/404",
      fallbackRoutes: [],
      isIndex: false
    };
    __name(ensure404Route, "ensure404Route");
    __name(default404Page, "default404Page");
    default404Page.isAstroComponentFactory = true;
    default404Instance = {
      default: default404Page
    };
  }
});

// dist/_worker.js/chunks/index_BnlZSNsy.mjs
function hasActionPayload(locals) {
  return "_actionPayload" in locals;
}
function createGetActionResult(locals) {
  return (actionFn) => {
    if (!hasActionPayload(locals) || actionFn.toString() !== getActionQueryString(locals._actionPayload.actionName)) {
      return void 0;
    }
    return deserializeActionResult(locals._actionPayload.actionResult);
  };
}
function createCallAction(context) {
  return (baseAction, input) => {
    const action = baseAction.bind(context);
    return action(input);
  };
}
function shouldAppendForwardSlash(trailingSlash, buildFormat) {
  switch (trailingSlash) {
    case "always":
      return true;
    case "never":
      return false;
    case "ignore": {
      switch (buildFormat) {
        case "directory":
          return true;
        case "preserve":
        case "file":
          return false;
      }
    }
  }
}
function requestHasLocale(locales) {
  return function(context) {
    return pathHasLocale(context.url.pathname, locales);
  };
}
function requestIs404Or500(request, base = "") {
  const url6 = new URL(request.url);
  return url6.pathname.startsWith(`${base}/404`) || url6.pathname.startsWith(`${base}/500`);
}
function pathHasLocale(path, locales) {
  const segments = path.split("/");
  for (const segment of segments) {
    for (const locale of locales) {
      if (typeof locale === "string") {
        if (normalizeTheLocale(segment) === normalizeTheLocale(locale)) {
          return true;
        }
      } else if (segment === locale.path) {
        return true;
      }
    }
  }
  return false;
}
function getPathByLocale(locale, locales) {
  for (const loopLocale of locales) {
    if (typeof loopLocale === "string") {
      if (loopLocale === locale) {
        return loopLocale;
      }
    } else {
      for (const code of loopLocale.codes) {
        if (code === locale) {
          return loopLocale.path;
        }
      }
    }
  }
  throw new AstroError(i18nNoLocaleFoundInPath);
}
function normalizeTheLocale(locale) {
  return locale.replaceAll("_", "-").toLowerCase();
}
function toCodes(locales) {
  return locales.map((loopLocale) => {
    if (typeof loopLocale === "string") {
      return loopLocale;
    } else {
      return loopLocale.codes[0];
    }
  });
}
function redirectToDefaultLocale({
  trailingSlash,
  format,
  base,
  defaultLocale
}) {
  return function(context, statusCode) {
    if (shouldAppendForwardSlash(trailingSlash, format)) {
      return context.redirect(`${appendForwardSlash(joinPaths(base, defaultLocale))}`, statusCode);
    } else {
      return context.redirect(`${joinPaths(base, defaultLocale)}`, statusCode);
    }
  };
}
function notFound({ base, locales }) {
  return function(context, response) {
    if (response?.headers.get(REROUTE_DIRECTIVE_HEADER) === "no")
      return response;
    const url6 = context.url;
    const isRoot = url6.pathname === base + "/" || url6.pathname === base;
    if (!(isRoot || pathHasLocale(url6.pathname, locales))) {
      if (response) {
        response.headers.set(REROUTE_DIRECTIVE_HEADER, "no");
        return new Response(response.body, {
          status: 404,
          headers: response.headers
        });
      } else {
        return new Response(null, {
          status: 404,
          headers: {
            [REROUTE_DIRECTIVE_HEADER]: "no"
          }
        });
      }
    }
    return void 0;
  };
}
function redirectToFallback({
  fallback,
  locales,
  defaultLocale,
  strategy,
  base,
  fallbackType
}) {
  return async function(context, response) {
    if (response.status >= 300 && fallback) {
      const fallbackKeys = fallback ? Object.keys(fallback) : [];
      const segments = context.url.pathname.split("/");
      const urlLocale = segments.find((segment) => {
        for (const locale of locales) {
          if (typeof locale === "string") {
            if (locale === segment) {
              return true;
            }
          } else if (locale.path === segment) {
            return true;
          }
        }
        return false;
      });
      if (urlLocale && fallbackKeys.includes(urlLocale)) {
        const fallbackLocale = fallback[urlLocale];
        const pathFallbackLocale = getPathByLocale(fallbackLocale, locales);
        let newPathname;
        if (pathFallbackLocale === defaultLocale && strategy === "pathname-prefix-other-locales") {
          if (context.url.pathname.includes(`${base}`)) {
            newPathname = context.url.pathname.replace(`/${urlLocale}`, ``);
          } else {
            newPathname = context.url.pathname.replace(`/${urlLocale}`, `/`);
          }
        } else {
          newPathname = context.url.pathname.replace(`/${urlLocale}`, `/${pathFallbackLocale}`);
        }
        if (fallbackType === "rewrite") {
          return await context.rewrite(newPathname);
        } else {
          return context.redirect(newPathname);
        }
      }
    }
    return response;
  };
}
function parseLocale(header) {
  if (header === "*") {
    return [{ locale: header, qualityValue: void 0 }];
  }
  const result = [];
  const localeValues = header.split(",").map((str) => str.trim());
  for (const localeValue of localeValues) {
    const split = localeValue.split(";").map((str) => str.trim());
    const localeName = split[0];
    const qualityValue = split[1];
    if (!split) {
      continue;
    }
    if (qualityValue && qualityValue.startsWith("q=")) {
      const qualityValueAsFloat = Number.parseFloat(qualityValue.slice("q=".length));
      if (Number.isNaN(qualityValueAsFloat) || qualityValueAsFloat > 1) {
        result.push({
          locale: localeName,
          qualityValue: void 0
        });
      } else {
        result.push({
          locale: localeName,
          qualityValue: qualityValueAsFloat
        });
      }
    } else {
      result.push({
        locale: localeName,
        qualityValue: void 0
      });
    }
  }
  return result;
}
function sortAndFilterLocales(browserLocaleList, locales) {
  const normalizedLocales = toCodes(locales).map(normalizeTheLocale);
  return browserLocaleList.filter((browserLocale) => {
    if (browserLocale.locale !== "*") {
      return normalizedLocales.includes(normalizeTheLocale(browserLocale.locale));
    }
    return true;
  }).sort((a2, b2) => {
    if (a2.qualityValue && b2.qualityValue) {
      return Math.sign(b2.qualityValue - a2.qualityValue);
    }
    return 0;
  });
}
function computePreferredLocale(request, locales) {
  const acceptHeader = request.headers.get("Accept-Language");
  let result = void 0;
  if (acceptHeader) {
    const browserLocaleList = sortAndFilterLocales(parseLocale(acceptHeader), locales);
    const firstResult = browserLocaleList.at(0);
    if (firstResult && firstResult.locale !== "*") {
      for (const currentLocale of locales) {
        if (typeof currentLocale === "string") {
          if (normalizeTheLocale(currentLocale) === normalizeTheLocale(firstResult.locale)) {
            result = currentLocale;
          }
        } else {
          for (const currentCode of currentLocale.codes) {
            if (normalizeTheLocale(currentCode) === normalizeTheLocale(firstResult.locale)) {
              result = currentLocale.path;
            }
          }
        }
      }
    }
  }
  return result;
}
function computePreferredLocaleList(request, locales) {
  const acceptHeader = request.headers.get("Accept-Language");
  let result = [];
  if (acceptHeader) {
    const browserLocaleList = sortAndFilterLocales(parseLocale(acceptHeader), locales);
    if (browserLocaleList.length === 1 && browserLocaleList.at(0).locale === "*") {
      return locales.map((locale) => {
        if (typeof locale === "string") {
          return locale;
        } else {
          return locale.codes.at(0);
        }
      });
    } else if (browserLocaleList.length > 0) {
      for (const browserLocale of browserLocaleList) {
        for (const loopLocale of locales) {
          if (typeof loopLocale === "string") {
            if (normalizeTheLocale(loopLocale) === normalizeTheLocale(browserLocale.locale)) {
              result.push(loopLocale);
            }
          } else {
            for (const code of loopLocale.codes) {
              if (code === browserLocale.locale) {
                result.push(loopLocale.path);
              }
            }
          }
        }
      }
    }
  }
  return result;
}
function computeCurrentLocale(pathname, locales, defaultLocale) {
  for (const segment of pathname.split("/")) {
    for (const locale of locales) {
      if (typeof locale === "string") {
        if (!segment.includes(locale))
          continue;
        if (normalizeTheLocale(locale) === normalizeTheLocale(segment)) {
          return locale;
        }
      } else {
        if (locale.path === segment) {
          return locale.codes.at(0);
        } else {
          for (const code of locale.codes) {
            if (normalizeTheLocale(code) === normalizeTheLocale(segment)) {
              return code;
            }
          }
        }
      }
    }
  }
  for (const locale of locales) {
    if (typeof locale === "string") {
      if (locale === defaultLocale) {
        return locale;
      }
    } else {
      if (locale.path === defaultLocale) {
        return locale.codes.at(0);
      }
    }
  }
}
function parse2(str, opt) {
  if (typeof str !== "string") {
    throw new TypeError("argument str must be a string");
  }
  var obj = {};
  var len = str.length;
  if (len < 2)
    return obj;
  var dec = opt && opt.decode || decode;
  var index = 0;
  var eqIdx = 0;
  var endIdx = 0;
  do {
    eqIdx = str.indexOf("=", index);
    if (eqIdx === -1)
      break;
    endIdx = str.indexOf(";", index);
    if (endIdx === -1) {
      endIdx = len;
    } else if (eqIdx > endIdx) {
      index = str.lastIndexOf(";", eqIdx - 1) + 1;
      continue;
    }
    var keyStartIdx = startIndex(str, index, eqIdx);
    var keyEndIdx = endIndex(str, eqIdx, keyStartIdx);
    var key = str.slice(keyStartIdx, keyEndIdx);
    if (!__hasOwnProperty.call(obj, key)) {
      var valStartIdx = startIndex(str, eqIdx + 1, endIdx);
      var valEndIdx = endIndex(str, endIdx, valStartIdx);
      if (str.charCodeAt(valStartIdx) === 34 && str.charCodeAt(valEndIdx - 1) === 34) {
        valStartIdx++;
        valEndIdx--;
      }
      var val = str.slice(valStartIdx, valEndIdx);
      obj[key] = tryDecode(val, dec);
    }
    index = endIdx + 1;
  } while (index < len);
  return obj;
}
function startIndex(str, index, max) {
  do {
    var code = str.charCodeAt(index);
    if (code !== 32 && code !== 9)
      return index;
  } while (++index < max);
  return max;
}
function endIndex(str, index, min) {
  while (index > min) {
    var code = str.charCodeAt(--index);
    if (code !== 32 && code !== 9)
      return index + 1;
  }
  return min;
}
function serialize(name, val, opt) {
  var enc = opt && opt.encode || encodeURIComponent;
  if (typeof enc !== "function") {
    throw new TypeError("option encode is invalid");
  }
  if (!cookieNameRegExp.test(name)) {
    throw new TypeError("argument name is invalid");
  }
  var value = enc(val);
  if (!cookieValueRegExp.test(value)) {
    throw new TypeError("argument val is invalid");
  }
  var str = name + "=" + value;
  if (!opt)
    return str;
  if (null != opt.maxAge) {
    var maxAge = Math.floor(opt.maxAge);
    if (!isFinite(maxAge)) {
      throw new TypeError("option maxAge is invalid");
    }
    str += "; Max-Age=" + maxAge;
  }
  if (opt.domain) {
    if (!domainValueRegExp.test(opt.domain)) {
      throw new TypeError("option domain is invalid");
    }
    str += "; Domain=" + opt.domain;
  }
  if (opt.path) {
    if (!pathValueRegExp.test(opt.path)) {
      throw new TypeError("option path is invalid");
    }
    str += "; Path=" + opt.path;
  }
  if (opt.expires) {
    var expires = opt.expires;
    if (!isDate(expires) || isNaN(expires.valueOf())) {
      throw new TypeError("option expires is invalid");
    }
    str += "; Expires=" + expires.toUTCString();
  }
  if (opt.httpOnly) {
    str += "; HttpOnly";
  }
  if (opt.secure) {
    str += "; Secure";
  }
  if (opt.partitioned) {
    str += "; Partitioned";
  }
  if (opt.priority) {
    var priority = typeof opt.priority === "string" ? opt.priority.toLowerCase() : opt.priority;
    switch (priority) {
      case "low":
        str += "; Priority=Low";
        break;
      case "medium":
        str += "; Priority=Medium";
        break;
      case "high":
        str += "; Priority=High";
        break;
      default:
        throw new TypeError("option priority is invalid");
    }
  }
  if (opt.sameSite) {
    var sameSite = typeof opt.sameSite === "string" ? opt.sameSite.toLowerCase() : opt.sameSite;
    switch (sameSite) {
      case true:
        str += "; SameSite=Strict";
        break;
      case "lax":
        str += "; SameSite=Lax";
        break;
      case "strict":
        str += "; SameSite=Strict";
        break;
      case "none":
        str += "; SameSite=None";
        break;
      default:
        throw new TypeError("option sameSite is invalid");
    }
  }
  return str;
}
function decode(str) {
  return str.indexOf("%") !== -1 ? decodeURIComponent(str) : str;
}
function isDate(val) {
  return __toString.call(val) === "[object Date]";
}
function tryDecode(str, decode2) {
  try {
    return decode2(str);
  } catch (e2) {
    return str;
  }
}
function attachCookiesToResponse(response, cookies) {
  Reflect.set(response, astroCookiesSymbol, cookies);
}
function getCookiesFromResponse(response) {
  let cookies = Reflect.get(response, astroCookiesSymbol);
  if (cookies != null) {
    return cookies;
  } else {
    return void 0;
  }
}
function* getSetCookiesFromResponse(response) {
  const cookies = getCookiesFromResponse(response);
  if (!cookies) {
    return [];
  }
  for (const headerValue of AstroCookies.consume(cookies)) {
    yield headerValue;
  }
  return [];
}
async function callMiddleware(onRequest2, apiContext, responseFunction) {
  let nextCalled = false;
  let responseFunctionPromise = void 0;
  const next = /* @__PURE__ */ __name(async (payload) => {
    nextCalled = true;
    responseFunctionPromise = responseFunction(apiContext, payload);
    return responseFunctionPromise;
  }, "next");
  let middlewarePromise = onRequest2(apiContext, next);
  return await Promise.resolve(middlewarePromise).then(async (value) => {
    if (nextCalled) {
      if (typeof value !== "undefined") {
        if (value instanceof Response === false) {
          throw new AstroError(MiddlewareNotAResponse);
        }
        return value;
      } else {
        if (responseFunctionPromise) {
          return responseFunctionPromise;
        } else {
          throw new AstroError(MiddlewareNotAResponse);
        }
      }
    } else if (typeof value === "undefined") {
      throw new AstroError(MiddlewareNoDataOrNextCalled);
    } else if (value instanceof Response === false) {
      throw new AstroError(MiddlewareNotAResponse);
    } else {
      return value;
    }
  });
}
async function renderRedirect(renderContext) {
  const {
    request: { method },
    routeData
  } = renderContext;
  const { redirect, redirectRoute } = routeData;
  const status = redirectRoute && typeof redirect === "object" ? redirect.status : method === "GET" ? 301 : 308;
  const headers = { location: encodeURI(redirectRouteGenerate(renderContext)) };
  return new Response(null, { status, headers });
}
function redirectRouteGenerate(renderContext) {
  const {
    params,
    routeData: { redirect, redirectRoute }
  } = renderContext;
  if (typeof redirectRoute !== "undefined") {
    return redirectRoute?.generate(params) || redirectRoute?.pathname || "/";
  } else if (typeof redirect === "string") {
    let target = redirect;
    for (const param of Object.keys(params)) {
      const paramValue = params[param];
      target = target.replace(`[${param}]`, paramValue).replace(`[...${param}]`, paramValue);
    }
    return target;
  } else if (typeof redirect === "undefined") {
    return "/";
  }
  return redirect.destination;
}
function validateGetStaticPathsParameter([key, value], route) {
  if (!VALID_PARAM_TYPES.includes(typeof value)) {
    throw new AstroError({
      ...GetStaticPathsInvalidRouteParam,
      message: GetStaticPathsInvalidRouteParam.message(key, value, typeof value),
      location: {
        file: route
      }
    });
  }
}
function validateDynamicRouteModule(mod, {
  ssr,
  route
}) {
  if ((!ssr || route.prerender) && !mod.getStaticPaths) {
    throw new AstroError({
      ...GetStaticPathsRequired,
      location: { file: route.component }
    });
  }
}
function validateGetStaticPathsResult(result, logger, route) {
  if (!Array.isArray(result)) {
    throw new AstroError({
      ...InvalidGetStaticPathsReturn,
      message: InvalidGetStaticPathsReturn.message(typeof result),
      location: {
        file: route.component
      }
    });
  }
  result.forEach((pathObject) => {
    if (typeof pathObject === "object" && Array.isArray(pathObject) || pathObject === null) {
      throw new AstroError({
        ...InvalidGetStaticPathsEntry,
        message: InvalidGetStaticPathsEntry.message(
          Array.isArray(pathObject) ? "array" : typeof pathObject
        )
      });
    }
    if (pathObject.params === void 0 || pathObject.params === null || pathObject.params && Object.keys(pathObject.params).length === 0) {
      throw new AstroError({
        ...GetStaticPathsExpectedParams,
        location: {
          file: route.component
        }
      });
    }
    for (const [key, val] of Object.entries(pathObject.params)) {
      if (!(typeof val === "undefined" || typeof val === "string" || typeof val === "number")) {
        logger.warn(
          "router",
          `getStaticPaths() returned an invalid path param: "${key}". A string, number or undefined value was expected, but got \`${JSON.stringify(
            val
          )}\`.`
        );
      }
      if (typeof val === "string" && val === "") {
        logger.warn(
          "router",
          `getStaticPaths() returned an invalid path param: "${key}". \`undefined\` expected for an optional param, but got empty string.`
        );
      }
    }
  });
}
function stringifyParams(params, route) {
  const validatedParams = Object.entries(params).reduce((acc, next) => {
    validateGetStaticPathsParameter(next, route.component);
    const [key, value] = next;
    if (value !== void 0) {
      acc[key] = typeof value === "string" ? trimSlashes(value) : value.toString();
    }
    return acc;
  }, {});
  return route.generate(validatedParams);
}
function generatePaginateFunction(routeMatch) {
  return /* @__PURE__ */ __name(function paginateUtility(data6, args = {}) {
    let { pageSize: _pageSize, params: _params, props: _props } = args;
    const pageSize = _pageSize || 10;
    const paramName = "page";
    const additionalParams = _params || {};
    const additionalProps = _props || {};
    let includesFirstPageNumber;
    if (routeMatch.params.includes(`...${paramName}`)) {
      includesFirstPageNumber = false;
    } else if (routeMatch.params.includes(`${paramName}`)) {
      includesFirstPageNumber = true;
    } else {
      throw new AstroError({
        ...PageNumberParamNotFound,
        message: PageNumberParamNotFound.message(paramName)
      });
    }
    const lastPage = Math.max(1, Math.ceil(data6.length / pageSize));
    const result = [...Array(lastPage).keys()].map((num) => {
      const pageNum = num + 1;
      const start = pageSize === Infinity ? 0 : (pageNum - 1) * pageSize;
      const end = Math.min(start + pageSize, data6.length);
      const params = {
        ...additionalParams,
        [paramName]: includesFirstPageNumber || pageNum > 1 ? String(pageNum) : void 0
      };
      const current = correctIndexRoute(routeMatch.generate({ ...params }));
      const next = pageNum === lastPage ? void 0 : correctIndexRoute(routeMatch.generate({ ...params, page: String(pageNum + 1) }));
      const prev = pageNum === 1 ? void 0 : correctIndexRoute(
        routeMatch.generate({
          ...params,
          page: !includesFirstPageNumber && pageNum - 1 === 1 ? void 0 : String(pageNum - 1)
        })
      );
      const first = pageNum === 1 ? void 0 : correctIndexRoute(
        routeMatch.generate({
          ...params,
          page: includesFirstPageNumber ? "1" : void 0
        })
      );
      const last = pageNum === lastPage ? void 0 : correctIndexRoute(routeMatch.generate({ ...params, page: String(lastPage) }));
      return {
        params,
        props: {
          ...additionalProps,
          page: {
            data: data6.slice(start, end),
            start,
            end: end - 1,
            size: pageSize,
            total: data6.length,
            currentPage: pageNum,
            lastPage,
            url: { current, next, prev, first, last }
          }
        }
      };
    });
    return result;
  }, "paginateUtility");
}
function correctIndexRoute(route) {
  if (route === "") {
    return "/";
  }
  return route;
}
async function callGetStaticPaths({
  mod,
  route,
  routeCache,
  logger,
  ssr
}) {
  const cached = routeCache.get(route);
  if (!mod) {
    throw new Error("This is an error caused by Astro and not your code. Please file an issue.");
  }
  if (cached?.staticPaths) {
    return cached.staticPaths;
  }
  validateDynamicRouteModule(mod, { ssr, route });
  if (ssr && !route.prerender) {
    const entry = Object.assign([], { keyed: /* @__PURE__ */ new Map() });
    routeCache.set(route, { ...cached, staticPaths: entry });
    return entry;
  }
  let staticPaths = [];
  if (!mod.getStaticPaths) {
    throw new Error("Unexpected Error.");
  }
  staticPaths = await mod.getStaticPaths({
    // Q: Why the cast?
    // A: So users downstream can have nicer typings, we have to make some sacrifice in our internal typings, which necessitate a cast here
    paginate: generatePaginateFunction(route)
  });
  validateGetStaticPathsResult(staticPaths, logger, route);
  const keyedStaticPaths = staticPaths;
  keyedStaticPaths.keyed = /* @__PURE__ */ new Map();
  for (const sp of keyedStaticPaths) {
    const paramsKey = stringifyParams(sp.params, route);
    keyedStaticPaths.keyed.set(paramsKey, sp);
  }
  routeCache.set(route, { ...cached, staticPaths: keyedStaticPaths });
  return keyedStaticPaths;
}
function findPathItemByKey(staticPaths, params, route, logger) {
  const paramsKey = stringifyParams(params, route);
  const matchedStaticPath = staticPaths.keyed.get(paramsKey);
  if (matchedStaticPath) {
    return matchedStaticPath;
  }
  logger.debug("router", `findPathItemByKey() - Unexpected cache miss looking for ${paramsKey}`);
}
function routeIsRedirect(route) {
  return route?.type === "redirect";
}
function routeIsFallback(route) {
  return route?.type === "fallback";
}
async function getProps(opts) {
  const { logger, mod, routeData: route, routeCache, pathname, serverLike } = opts;
  if (!route || route.pathname) {
    return {};
  }
  if (routeIsRedirect(route) || routeIsFallback(route) || route.component === DEFAULT_404_COMPONENT) {
    return {};
  }
  const staticPaths = await callGetStaticPaths({
    mod,
    route,
    routeCache,
    logger,
    ssr: serverLike
  });
  const params = getParams(route, pathname);
  const matchedStaticPath = findPathItemByKey(staticPaths, params, route, logger);
  if (!matchedStaticPath && (serverLike ? route.prerender : true)) {
    throw new AstroError({
      ...NoMatchingStaticPathFound,
      message: NoMatchingStaticPathFound.message(pathname),
      hint: NoMatchingStaticPathFound.hint([route.component])
    });
  }
  if (mod) {
    validatePrerenderEndpointCollision(route, mod, params);
  }
  const props = matchedStaticPath?.props ? { ...matchedStaticPath.props } : {};
  return props;
}
function getParams(route, pathname) {
  if (!route.params.length)
    return {};
  const paramsMatch = route.pattern.exec(decodeURIComponent(pathname));
  if (!paramsMatch)
    return {};
  const params = {};
  route.params.forEach((key, i2) => {
    if (key.startsWith("...")) {
      params[key.slice(3)] = paramsMatch[i2 + 1] ? paramsMatch[i2 + 1] : void 0;
    } else {
      params[key] = paramsMatch[i2 + 1];
    }
  });
  return params;
}
function validatePrerenderEndpointCollision(route, mod, params) {
  if (route.type === "endpoint" && mod.getStaticPaths) {
    const lastSegment = route.segments[route.segments.length - 1];
    const paramValues = Object.values(params);
    const lastParam = paramValues[paramValues.length - 1];
    if (lastSegment.length === 1 && lastSegment[0].dynamic && lastParam === void 0) {
      throw new AstroError({
        ...PrerenderDynamicEndpointPathCollide,
        message: PrerenderDynamicEndpointPathCollide.message(route.route),
        hint: PrerenderDynamicEndpointPathCollide.hint(route.component),
        location: {
          file: route.component
        }
      });
    }
  }
}
function getFunctionExpression(slot) {
  if (!slot)
    return;
  const expressions = slot?.expressions?.filter((e2) => isRenderInstruction(e2) === false);
  if (expressions?.length !== 1)
    return;
  return expressions[0];
}
function findRouteToRewrite({
  payload,
  routes,
  request,
  trailingSlash,
  buildFormat,
  base
}) {
  let newUrl = void 0;
  if (payload instanceof URL) {
    newUrl = payload;
  } else if (payload instanceof Request) {
    newUrl = new URL(payload.url);
  } else {
    newUrl = new URL(payload, new URL(request.url).origin);
  }
  let pathname = newUrl.pathname;
  if (base !== "/" && newUrl.pathname.startsWith(base)) {
    pathname = shouldAppendForwardSlash(trailingSlash, buildFormat) ? appendForwardSlash(newUrl.pathname) : removeTrailingForwardSlash(newUrl.pathname);
    pathname = pathname.slice(base.length);
  }
  let foundRoute;
  for (const route of routes) {
    if (route.pattern.test(decodeURI(pathname))) {
      foundRoute = route;
      break;
    }
  }
  if (foundRoute) {
    return {
      routeData: foundRoute,
      newUrl,
      pathname
    };
  } else {
    const custom404 = routes.find((route) => route.route === "/404");
    if (custom404) {
      return { routeData: custom404, newUrl, pathname };
    } else {
      return { routeData: DEFAULT_404_ROUTE, newUrl, pathname };
    }
  }
}
function copyRequest(newUrl, oldRequest) {
  if (oldRequest.bodyUsed) {
    throw new AstroError(RewriteWithBodyUsed);
  }
  return new Request(newUrl, {
    method: oldRequest.method,
    headers: oldRequest.headers,
    body: oldRequest.body,
    referrer: oldRequest.referrer,
    referrerPolicy: oldRequest.referrerPolicy,
    mode: oldRequest.mode,
    credentials: oldRequest.credentials,
    cache: oldRequest.cache,
    redirect: oldRequest.redirect,
    integrity: oldRequest.integrity,
    signal: oldRequest.signal,
    keepalive: oldRequest.keepalive,
    // https://fetch.spec.whatwg.org/#dom-request-duplex
    // @ts-expect-error It isn't part of the types, but undici accepts it and it allows to carry over the body to a new request
    duplex: "half"
  });
}
function setOriginPathname(request, pathname) {
  Reflect.set(request, originPathnameSymbol, encodeURIComponent(pathname));
}
function sequence(...handlers) {
  const filtered = handlers.filter((h2) => !!h2);
  const length = filtered.length;
  if (!length) {
    return defineMiddleware((_context, next) => {
      return next();
    });
  }
  return defineMiddleware((context, next) => {
    let carriedPayload = void 0;
    return applyHandle(0, context);
    function applyHandle(i2, handleContext) {
      const handle = filtered[i2];
      const result = handle(handleContext, async (payload) => {
        if (i2 < length - 1) {
          if (payload) {
            let newRequest;
            if (payload instanceof Request) {
              newRequest = payload;
            } else if (payload instanceof URL) {
              newRequest = new Request(payload, handleContext.request);
            } else {
              newRequest = new Request(
                new URL(payload, handleContext.url.origin),
                handleContext.request
              );
            }
            const pipeline = Reflect.get(handleContext, apiContextRoutesSymbol);
            const { routeData, pathname } = await pipeline.tryRewrite(
              payload,
              handleContext.request
            );
            carriedPayload = payload;
            handleContext.request = newRequest;
            handleContext.url = new URL(newRequest.url);
            handleContext.cookies = new AstroCookies(newRequest);
            handleContext.params = getParams(routeData, pathname);
          }
          return applyHandle(i2 + 1, handleContext);
        } else {
          return next(payload ?? carriedPayload);
        }
      });
      return result;
    }
    __name(applyHandle, "applyHandle");
  });
}
function defineMiddleware(fn) {
  return fn;
}
var parse_1, serialize_1, __toString, __hasOwnProperty, cookieNameRegExp, cookieValueRegExp, domainValueRegExp, pathValueRegExp, DELETED_EXPIRATION, DELETED_VALUE, responseSentSymbol2, AstroCookie, AstroCookies, astroCookiesSymbol, VALID_PARAM_TYPES, RouteCache, Slots, apiContextRoutesSymbol, RenderContext;
var init_index_BnlZSNsy = __esm({
  "dist/_worker.js/chunks/index_BnlZSNsy.mjs"() {
    "use strict";
    init_checked_fetch();
    init_modules_watch_stub();
    init_assets_service_B44g93js();
    init_astro_designed_error_pages_BHdqSjjW();
    init_server_Den36nYv();
    globalThis.process ??= {};
    globalThis.process.env ??= {};
    __name(hasActionPayload, "hasActionPayload");
    __name(createGetActionResult, "createGetActionResult");
    __name(createCallAction, "createCallAction");
    __name(shouldAppendForwardSlash, "shouldAppendForwardSlash");
    __name(requestHasLocale, "requestHasLocale");
    __name(requestIs404Or500, "requestIs404Or500");
    __name(pathHasLocale, "pathHasLocale");
    __name(getPathByLocale, "getPathByLocale");
    __name(normalizeTheLocale, "normalizeTheLocale");
    __name(toCodes, "toCodes");
    __name(redirectToDefaultLocale, "redirectToDefaultLocale");
    __name(notFound, "notFound");
    __name(redirectToFallback, "redirectToFallback");
    __name(parseLocale, "parseLocale");
    __name(sortAndFilterLocales, "sortAndFilterLocales");
    __name(computePreferredLocale, "computePreferredLocale");
    __name(computePreferredLocaleList, "computePreferredLocaleList");
    __name(computeCurrentLocale, "computeCurrentLocale");
    parse_1 = parse2;
    serialize_1 = serialize;
    __toString = Object.prototype.toString;
    __hasOwnProperty = Object.prototype.hasOwnProperty;
    cookieNameRegExp = /^[!#$%&'*+\-.^_`|~0-9A-Za-z]+$/;
    cookieValueRegExp = /^("?)[\u0021\u0023-\u002B\u002D-\u003A\u003C-\u005B\u005D-\u007E]*\1$/;
    domainValueRegExp = /^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i;
    pathValueRegExp = /^[\u0020-\u003A\u003D-\u007E]*$/;
    __name(parse2, "parse");
    __name(startIndex, "startIndex");
    __name(endIndex, "endIndex");
    __name(serialize, "serialize");
    __name(decode, "decode");
    __name(isDate, "isDate");
    __name(tryDecode, "tryDecode");
    DELETED_EXPIRATION = /* @__PURE__ */ new Date(0);
    DELETED_VALUE = "deleted";
    responseSentSymbol2 = Symbol.for("astro.responseSent");
    AstroCookie = class {
      constructor(value) {
        this.value = value;
      }
      json() {
        if (this.value === void 0) {
          throw new Error(`Cannot convert undefined to an object.`);
        }
        return JSON.parse(this.value);
      }
      number() {
        return Number(this.value);
      }
      boolean() {
        if (this.value === "false")
          return false;
        if (this.value === "0")
          return false;
        return Boolean(this.value);
      }
    };
    __name(AstroCookie, "AstroCookie");
    AstroCookies = class {
      #request;
      #requestValues;
      #outgoing;
      #consumed;
      constructor(request) {
        this.#request = request;
        this.#requestValues = null;
        this.#outgoing = null;
        this.#consumed = false;
      }
      /**
       * Astro.cookies.delete(key) is used to delete a cookie. Using this method will result
       * in a Set-Cookie header added to the response.
       * @param key The cookie to delete
       * @param options Options related to this deletion, such as the path of the cookie.
       */
      delete(key, options) {
        const {
          // @ts-expect-error
          maxAge: _ignoredMaxAge,
          // @ts-expect-error
          expires: _ignoredExpires,
          ...sanitizedOptions
        } = options || {};
        const serializeOptions = {
          expires: DELETED_EXPIRATION,
          ...sanitizedOptions
        };
        this.#ensureOutgoingMap().set(key, [
          DELETED_VALUE,
          serialize_1(key, DELETED_VALUE, serializeOptions),
          false
        ]);
      }
      /**
       * Astro.cookies.get(key) is used to get a cookie value. The cookie value is read from the
       * request. If you have set a cookie via Astro.cookies.set(key, value), the value will be taken
       * from that set call, overriding any values already part of the request.
       * @param key The cookie to get.
       * @returns An object containing the cookie value as well as convenience methods for converting its value.
       */
      get(key, options = void 0) {
        if (this.#outgoing?.has(key)) {
          let [serializedValue, , isSetValue] = this.#outgoing.get(key);
          if (isSetValue) {
            return new AstroCookie(serializedValue);
          } else {
            return void 0;
          }
        }
        const values = this.#ensureParsed(options);
        if (key in values) {
          const value = values[key];
          return new AstroCookie(value);
        }
      }
      /**
       * Astro.cookies.has(key) returns a boolean indicating whether this cookie is either
       * part of the initial request or set via Astro.cookies.set(key)
       * @param key The cookie to check for.
       * @returns
       */
      has(key, options = void 0) {
        if (this.#outgoing?.has(key)) {
          let [, , isSetValue] = this.#outgoing.get(key);
          return isSetValue;
        }
        const values = this.#ensureParsed(options);
        return !!values[key];
      }
      /**
       * Astro.cookies.set(key, value) is used to set a cookie's value. If provided
       * an object it will be stringified via JSON.stringify(value). Additionally you
       * can provide options customizing how this cookie will be set, such as setting httpOnly
       * in order to prevent the cookie from being read in client-side JavaScript.
       * @param key The name of the cookie to set.
       * @param value A value, either a string or other primitive or an object.
       * @param options Options for the cookie, such as the path and security settings.
       */
      set(key, value, options) {
        if (this.#consumed) {
          const warning = new Error(
            "Astro.cookies.set() was called after the cookies had already been sent to the browser.\nThis may have happened if this method was called in an imported component.\nPlease make sure that Astro.cookies.set() is only called in the frontmatter of the main page."
          );
          warning.name = "Warning";
          console.warn(warning);
        }
        let serializedValue;
        if (typeof value === "string") {
          serializedValue = value;
        } else {
          let toStringValue = value.toString();
          if (toStringValue === Object.prototype.toString.call(value)) {
            serializedValue = JSON.stringify(value);
          } else {
            serializedValue = toStringValue;
          }
        }
        const serializeOptions = {};
        if (options) {
          Object.assign(serializeOptions, options);
        }
        this.#ensureOutgoingMap().set(key, [
          serializedValue,
          serialize_1(key, serializedValue, serializeOptions),
          true
        ]);
        if (this.#request[responseSentSymbol2]) {
          throw new AstroError({
            ...ResponseSentError
          });
        }
      }
      /**
       * Merges a new AstroCookies instance into the current instance. Any new cookies
       * will be added to the current instance, overwriting any existing cookies with the same name.
       */
      merge(cookies) {
        const outgoing = cookies.#outgoing;
        if (outgoing) {
          for (const [key, value] of outgoing) {
            this.#ensureOutgoingMap().set(key, value);
          }
        }
      }
      /**
       * Astro.cookies.header() returns an iterator for the cookies that have previously
       * been set by either Astro.cookies.set() or Astro.cookies.delete().
       * This method is primarily used by adapters to set the header on outgoing responses.
       * @returns
       */
      *headers() {
        if (this.#outgoing == null)
          return;
        for (const [, value] of this.#outgoing) {
          yield value[1];
        }
      }
      /**
       * Behaves the same as AstroCookies.prototype.headers(),
       * but allows a warning when cookies are set after the instance is consumed.
       */
      static consume(cookies) {
        cookies.#consumed = true;
        return cookies.headers();
      }
      #ensureParsed(options = void 0) {
        if (!this.#requestValues) {
          this.#parse(options);
        }
        if (!this.#requestValues) {
          this.#requestValues = {};
        }
        return this.#requestValues;
      }
      #ensureOutgoingMap() {
        if (!this.#outgoing) {
          this.#outgoing = /* @__PURE__ */ new Map();
        }
        return this.#outgoing;
      }
      #parse(options = void 0) {
        const raw = this.#request.headers.get("cookie");
        if (!raw) {
          return;
        }
        this.#requestValues = parse_1(raw, options);
      }
    };
    __name(AstroCookies, "AstroCookies");
    astroCookiesSymbol = Symbol.for("astro.cookies");
    __name(attachCookiesToResponse, "attachCookiesToResponse");
    __name(getCookiesFromResponse, "getCookiesFromResponse");
    __name(getSetCookiesFromResponse, "getSetCookiesFromResponse");
    __name(callMiddleware, "callMiddleware");
    __name(renderRedirect, "renderRedirect");
    __name(redirectRouteGenerate, "redirectRouteGenerate");
    VALID_PARAM_TYPES = ["string", "number", "undefined"];
    __name(validateGetStaticPathsParameter, "validateGetStaticPathsParameter");
    __name(validateDynamicRouteModule, "validateDynamicRouteModule");
    __name(validateGetStaticPathsResult, "validateGetStaticPathsResult");
    __name(stringifyParams, "stringifyParams");
    __name(generatePaginateFunction, "generatePaginateFunction");
    __name(correctIndexRoute, "correctIndexRoute");
    __name(callGetStaticPaths, "callGetStaticPaths");
    RouteCache = class {
      logger;
      cache = {};
      mode;
      constructor(logger, mode = "production") {
        this.logger = logger;
        this.mode = mode;
      }
      /** Clear the cache. */
      clearAll() {
        this.cache = {};
      }
      set(route, entry) {
        const key = this.key(route);
        if (this.mode === "production" && this.cache[key]?.staticPaths) {
          this.logger.warn(null, `Internal Warning: route cache overwritten. (${key})`);
        }
        this.cache[key] = entry;
      }
      get(route) {
        return this.cache[this.key(route)];
      }
      key(route) {
        return `${route.route}_${route.component}`;
      }
    };
    __name(RouteCache, "RouteCache");
    __name(findPathItemByKey, "findPathItemByKey");
    __name(routeIsRedirect, "routeIsRedirect");
    __name(routeIsFallback, "routeIsFallback");
    __name(getProps, "getProps");
    __name(getParams, "getParams");
    __name(validatePrerenderEndpointCollision, "validatePrerenderEndpointCollision");
    __name(getFunctionExpression, "getFunctionExpression");
    Slots = class {
      #result;
      #slots;
      #logger;
      constructor(result, slots, logger) {
        this.#result = result;
        this.#slots = slots;
        this.#logger = logger;
        if (slots) {
          for (const key of Object.keys(slots)) {
            if (this[key] !== void 0) {
              throw new AstroError({
                ...ReservedSlotName,
                message: ReservedSlotName.message(key)
              });
            }
            Object.defineProperty(this, key, {
              get() {
                return true;
              },
              enumerable: true
            });
          }
        }
      }
      has(name) {
        if (!this.#slots)
          return false;
        return Boolean(this.#slots[name]);
      }
      async render(name, args = []) {
        if (!this.#slots || !this.has(name))
          return;
        const result = this.#result;
        if (!Array.isArray(args)) {
          this.#logger.warn(
            null,
            `Expected second parameter to be an array, received a ${typeof args}. If you're trying to pass an array as a single argument and getting unexpected results, make sure you're passing your array as a item of an array. Ex: Astro.slots.render('default', [["Hello", "World"]])`
          );
        } else if (args.length > 0) {
          const slotValue = this.#slots[name];
          const component = typeof slotValue === "function" ? await slotValue(result) : await slotValue;
          const expression = getFunctionExpression(component);
          if (expression) {
            const slot = /* @__PURE__ */ __name(async () => typeof expression === "function" ? expression(...args) : expression, "slot");
            return await renderSlotToString(result, slot).then((res) => {
              return res;
            });
          }
          if (typeof component === "function") {
            return await renderJSX(result, component(...args)).then(
              (res) => res != null ? String(res) : res
            );
          }
        }
        const content = await renderSlotToString(result, this.#slots[name]);
        const outHTML = chunkToString(result, content);
        return outHTML;
      }
    };
    __name(Slots, "Slots");
    __name(findRouteToRewrite, "findRouteToRewrite");
    __name(copyRequest, "copyRequest");
    __name(setOriginPathname, "setOriginPathname");
    apiContextRoutesSymbol = Symbol.for("context.routes");
    RenderContext = class {
      constructor(pipeline, locals, middleware, pathname, request, routeData, status, cookies = new AstroCookies(request), params = getParams(routeData, pathname), url6 = new URL(request.url), props = {}, partial = void 0) {
        this.pipeline = pipeline;
        this.locals = locals;
        this.middleware = middleware;
        this.pathname = pathname;
        this.request = request;
        this.routeData = routeData;
        this.status = status;
        this.cookies = cookies;
        this.params = params;
        this.url = url6;
        this.props = props;
        this.partial = partial;
      }
      /**
       * A flag that tells the render content if the rewriting was triggered
       */
      isRewriting = false;
      /**
       * A safety net in case of loops
       */
      counter = 0;
      static async create({
        locals = {},
        middleware,
        pathname,
        pipeline,
        request,
        routeData,
        status = 200,
        props,
        partial = void 0
      }) {
        const pipelineMiddleware = await pipeline.getMiddleware();
        setOriginPathname(request, pathname);
        return new RenderContext(
          pipeline,
          locals,
          sequence(...pipeline.internalMiddleware, middleware ?? pipelineMiddleware),
          pathname,
          request,
          routeData,
          status,
          void 0,
          void 0,
          void 0,
          props,
          partial
        );
      }
      /**
       * The main function of the RenderContext.
       *
       * Use this function to render any route known to Astro.
       * It attempts to render a route. A route can be a:
       *
       * - page
       * - redirect
       * - endpoint
       * - fallback
       */
      async render(componentInstance, slots = {}) {
        const { cookies, middleware, pipeline } = this;
        const { logger, serverLike, streaming } = pipeline;
        const isPrerendered = !serverLike || this.routeData.prerender;
        const props = Object.keys(this.props).length > 0 ? this.props : await getProps({
          mod: componentInstance,
          routeData: this.routeData,
          routeCache: this.pipeline.routeCache,
          pathname: this.pathname,
          logger,
          serverLike
        });
        const apiContext = this.createAPIContext(props, isPrerendered);
        this.counter++;
        if (this.counter === 4) {
          return new Response("Loop Detected", {
            // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/508
            status: 508,
            statusText: "Astro detected a loop where you tried to call the rewriting logic more than four times."
          });
        }
        const lastNext = /* @__PURE__ */ __name(async (ctx, payload) => {
          if (payload) {
            pipeline.logger.debug("router", "Called rewriting to:", payload);
            const {
              routeData,
              componentInstance: newComponent,
              pathname,
              newUrl
            } = await pipeline.tryRewrite(payload, this.request);
            this.routeData = routeData;
            componentInstance = newComponent;
            if (payload instanceof Request) {
              this.request = payload;
            } else {
              this.request = copyRequest(newUrl, this.request);
            }
            this.isRewriting = true;
            this.url = new URL(this.request.url);
            this.cookies = new AstroCookies(this.request);
            this.params = getParams(routeData, pathname);
            this.pathname = pathname;
            this.status = 200;
          }
          let response2;
          switch (this.routeData.type) {
            case "endpoint": {
              response2 = await renderEndpoint(componentInstance, ctx, serverLike, logger);
              break;
            }
            case "redirect":
              return renderRedirect(this);
            case "page": {
              const result = await this.createResult(componentInstance);
              try {
                response2 = await renderPage(
                  result,
                  componentInstance?.default,
                  props,
                  slots,
                  streaming,
                  this.routeData
                );
              } catch (e2) {
                result.cancelled = true;
                throw e2;
              }
              response2.headers.set(ROUTE_TYPE_HEADER, "page");
              if (this.routeData.route === "/404" || this.routeData.route === "/500") {
                response2.headers.set(REROUTE_DIRECTIVE_HEADER, "no");
              }
              if (this.isRewriting) {
                response2.headers.set(REWRITE_DIRECTIVE_HEADER_KEY, REWRITE_DIRECTIVE_HEADER_VALUE);
              }
              break;
            }
            case "fallback": {
              return new Response(null, { status: 500, headers: { [ROUTE_TYPE_HEADER]: "fallback" } });
            }
          }
          const responseCookies = getCookiesFromResponse(response2);
          if (responseCookies) {
            cookies.merge(responseCookies);
          }
          return response2;
        }, "lastNext");
        const response = await callMiddleware(middleware, apiContext, lastNext);
        if (response.headers.get(ROUTE_TYPE_HEADER)) {
          response.headers.delete(ROUTE_TYPE_HEADER);
        }
        attachCookiesToResponse(response, cookies);
        return response;
      }
      createAPIContext(props, isPrerendered) {
        const context = this.createActionAPIContext();
        const redirect = /* @__PURE__ */ __name((path, status = 302) => new Response(null, { status, headers: { Location: path } }), "redirect");
        Reflect.set(context, apiContextRoutesSymbol, this.pipeline);
        return Object.assign(context, {
          props,
          redirect,
          getActionResult: createGetActionResult(context.locals),
          callAction: createCallAction(context),
          // Used internally by Actions middleware.
          // TODO: discuss exposing this information from APIContext.
          // middleware runs on prerendered routes in the dev server,
          // so this is useful information to have.
          _isPrerendered: isPrerendered
        });
      }
      async #executeRewrite(reroutePayload) {
        this.pipeline.logger.debug("router", "Calling rewrite: ", reroutePayload);
        const { routeData, componentInstance, newUrl, pathname } = await this.pipeline.tryRewrite(
          reroutePayload,
          this.request
        );
        this.routeData = routeData;
        if (reroutePayload instanceof Request) {
          this.request = reroutePayload;
        } else {
          this.request = copyRequest(newUrl, this.request);
        }
        this.url = new URL(this.request.url);
        this.cookies = new AstroCookies(this.request);
        this.params = getParams(routeData, pathname);
        this.pathname = pathname;
        this.isRewriting = true;
        this.status = 200;
        return await this.render(componentInstance);
      }
      createActionAPIContext() {
        const renderContext = this;
        const { cookies, params, pipeline, url: url6 } = this;
        const generator = `Astro v${ASTRO_VERSION}`;
        const rewrite = /* @__PURE__ */ __name(async (reroutePayload) => {
          return await this.#executeRewrite(reroutePayload);
        }, "rewrite");
        return {
          cookies,
          get clientAddress() {
            return renderContext.clientAddress();
          },
          get currentLocale() {
            return renderContext.computeCurrentLocale();
          },
          generator,
          get locals() {
            return renderContext.locals;
          },
          // TODO(breaking): disallow replacing the locals object
          set locals(val) {
            if (typeof val !== "object") {
              throw new AstroError(LocalsNotAnObject);
            } else {
              renderContext.locals = val;
              Reflect.set(this.request, clientLocalsSymbol, val);
            }
          },
          params,
          get preferredLocale() {
            return renderContext.computePreferredLocale();
          },
          get preferredLocaleList() {
            return renderContext.computePreferredLocaleList();
          },
          rewrite,
          request: this.request,
          site: pipeline.site,
          url: url6
        };
      }
      async createResult(mod) {
        const { cookies, pathname, pipeline, routeData, status } = this;
        const { clientDirectives, inlinedScripts, compressHTML, manifest: manifest2, renderers: renderers2, resolve } = pipeline;
        const { links, scripts, styles } = await pipeline.headElements(routeData);
        const componentMetadata = await pipeline.componentMetadata(routeData) ?? manifest2.componentMetadata;
        const headers = new Headers({ "Content-Type": "text/html" });
        const partial = typeof this.partial === "boolean" ? this.partial : Boolean(mod.partial);
        const response = {
          status,
          statusText: "OK",
          get headers() {
            return headers;
          },
          // Disallow `Astro.response.headers = new Headers`
          set headers(_) {
            throw new AstroError(AstroResponseHeadersReassigned);
          }
        };
        const actionResult = hasActionPayload(this.locals) ? deserializeActionResult(this.locals._actionPayload.actionResult) : void 0;
        const result = {
          base: manifest2.base,
          cancelled: false,
          clientDirectives,
          inlinedScripts,
          componentMetadata,
          compressHTML,
          cookies,
          /** This function returns the `Astro` faux-global */
          createAstro: (astroGlobal, props, slots) => this.createAstro(result, astroGlobal, props, slots),
          links,
          params: this.params,
          partial,
          pathname,
          renderers: renderers2,
          resolve,
          response,
          request: this.request,
          scripts,
          styles,
          actionResult,
          serverIslandNameMap: manifest2.serverIslandNameMap ?? /* @__PURE__ */ new Map(),
          key: manifest2.key,
          trailingSlash: manifest2.trailingSlash,
          _metadata: {
            hasHydrationScript: false,
            rendererSpecificHydrationScripts: /* @__PURE__ */ new Set(),
            hasRenderedHead: false,
            renderedScripts: /* @__PURE__ */ new Set(),
            hasDirectives: /* @__PURE__ */ new Set(),
            headInTree: false,
            extraHead: [],
            propagators: /* @__PURE__ */ new Set()
          }
        };
        return result;
      }
      #astroPagePartial;
      /**
       * The Astro global is sourced in 3 different phases:
       * - **Static**: `.generator` and `.glob` is printed by the compiler, instantiated once per process per astro file
       * - **Page-level**: `.request`, `.cookies`, `.locals` etc. These remain the same for the duration of the request.
       * - **Component-level**: `.props`, `.slots`, and `.self` are unique to each _use_ of each component.
       *
       * The page level partial is used as the prototype of the user-visible `Astro` global object, which is instantiated once per use of a component.
       */
      createAstro(result, astroStaticPartial, props, slotValues) {
        let astroPagePartial;
        if (this.isRewriting) {
          astroPagePartial = this.#astroPagePartial = this.createAstroPagePartial(
            result,
            astroStaticPartial
          );
        } else {
          astroPagePartial = this.#astroPagePartial ??= this.createAstroPagePartial(
            result,
            astroStaticPartial
          );
        }
        const astroComponentPartial = { props, self: null };
        const Astro = Object.assign(
          Object.create(astroPagePartial),
          astroComponentPartial
        );
        let _slots;
        Object.defineProperty(Astro, "slots", {
          get: () => {
            if (!_slots) {
              _slots = new Slots(
                result,
                slotValues,
                this.pipeline.logger
              );
            }
            return _slots;
          }
        });
        return Astro;
      }
      createAstroPagePartial(result, astroStaticPartial) {
        const renderContext = this;
        const { cookies, locals, params, pipeline, url: url6 } = this;
        const { response } = result;
        const redirect = /* @__PURE__ */ __name((path, status = 302) => {
          if (this.request[responseSentSymbol]) {
            throw new AstroError({
              ...ResponseSentError
            });
          }
          return new Response(null, { status, headers: { Location: path } });
        }, "redirect");
        const rewrite = /* @__PURE__ */ __name(async (reroutePayload) => {
          return await this.#executeRewrite(reroutePayload);
        }, "rewrite");
        return {
          generator: astroStaticPartial.generator,
          glob: astroStaticPartial.glob,
          cookies,
          get clientAddress() {
            return renderContext.clientAddress();
          },
          get currentLocale() {
            return renderContext.computeCurrentLocale();
          },
          params,
          get preferredLocale() {
            return renderContext.computePreferredLocale();
          },
          get preferredLocaleList() {
            return renderContext.computePreferredLocaleList();
          },
          locals,
          redirect,
          rewrite,
          request: this.request,
          response,
          site: pipeline.site,
          getActionResult: createGetActionResult(locals),
          get callAction() {
            return createCallAction(this);
          },
          url: url6
        };
      }
      clientAddress() {
        const { pipeline, request } = this;
        if (clientAddressSymbol in request) {
          return Reflect.get(request, clientAddressSymbol);
        }
        if (pipeline.serverLike) {
          if (request.body === null) {
            throw new AstroError(PrerenderClientAddressNotAvailable);
          }
          if (pipeline.adapterName) {
            throw new AstroError({
              ...ClientAddressNotAvailable,
              message: ClientAddressNotAvailable.message(pipeline.adapterName)
            });
          }
        }
        throw new AstroError(StaticClientAddressNotAvailable);
      }
      /**
       * API Context may be created multiple times per request, i18n data needs to be computed only once.
       * So, it is computed and saved here on creation of the first APIContext and reused for later ones.
       */
      #currentLocale;
      computeCurrentLocale() {
        const {
          url: url6,
          pipeline: { i18n },
          routeData
        } = this;
        if (!i18n)
          return;
        const { defaultLocale, locales, strategy } = i18n;
        const fallbackTo = strategy === "pathname-prefix-other-locales" || strategy === "domains-prefix-other-locales" ? defaultLocale : void 0;
        if (this.#currentLocale) {
          return this.#currentLocale;
        }
        let computedLocale;
        if (routeData.pathname) {
          computedLocale = computeCurrentLocale(routeData.pathname, locales, defaultLocale);
        } else {
          computedLocale = computeCurrentLocale(url6.pathname, locales, defaultLocale);
        }
        this.#currentLocale = computedLocale ?? fallbackTo;
        return this.#currentLocale;
      }
      #preferredLocale;
      computePreferredLocale() {
        const {
          pipeline: { i18n },
          request
        } = this;
        if (!i18n)
          return;
        return this.#preferredLocale ??= computePreferredLocale(request, i18n.locales);
      }
      #preferredLocaleList;
      computePreferredLocaleList() {
        const {
          pipeline: { i18n },
          request
        } = this;
        if (!i18n)
          return;
        return this.#preferredLocaleList ??= computePreferredLocaleList(request, i18n.locales);
      }
    };
    __name(RenderContext, "RenderContext");
    __name(sequence, "sequence");
    __name(defineMiddleware, "defineMiddleware");
  }
});

// dist/_worker.js/_astro-internal_middleware.mjs
var astro_internal_middleware_exports = {};
__export(astro_internal_middleware_exports, {
  onRequest: () => onRequest
});
var When, isBuildContext, whenAmI, middlewares, onRequest$1, onRequest;
var init_astro_internal_middleware = __esm({
  "dist/_worker.js/_astro-internal_middleware.mjs"() {
    "use strict";
    init_checked_fetch();
    init_modules_watch_stub();
    init_astro_designed_error_pages_BHdqSjjW();
    init_index_BnlZSNsy();
    globalThis.process ??= {};
    globalThis.process.env ??= {};
    When = {
      Client: "client",
      Server: "server",
      Prerender: "prerender",
      StaticBuild: "staticBuild",
      DevServer: "devServer"
    };
    isBuildContext = Symbol.for("astro:when/buildContext");
    whenAmI = globalThis[isBuildContext] ? When.Prerender : When.Server;
    middlewares = {
      [When.Client]: () => {
        throw new Error("Client should not run a middleware!");
      },
      [When.DevServer]: (_, next) => next(),
      [When.Server]: (_, next) => next(),
      [When.Prerender]: (ctx, next) => {
        if (ctx.locals.runtime === void 0) {
          ctx.locals.runtime = {
            env: process.env
          };
        }
        return next();
      },
      [When.StaticBuild]: (_, next) => next()
    };
    onRequest$1 = middlewares[whenAmI];
    onRequest = sequence(
      onRequest$1
    );
  }
});

// dist/_worker.js/pages/_image.astro.mjs
var image_astro_exports = {};
__export(image_astro_exports, {
  page: () => page,
  renderers: () => renderers
});
var prerender, GET, _page, page;
var init_image_astro = __esm({
  "dist/_worker.js/pages/_image.astro.mjs"() {
    "use strict";
    init_checked_fetch();
    init_modules_watch_stub();
    init_renderers();
    globalThis.process ??= {};
    globalThis.process.env ??= {};
    prerender = false;
    GET = /* @__PURE__ */ __name((ctx) => {
      const href = ctx.url.searchParams.get("href");
      if (!href) {
        return new Response("Missing 'href' query parameter", {
          status: 400,
          statusText: "Missing 'href' query parameter"
        });
      }
      return fetch(new URL(href, ctx.url.origin));
    }, "GET");
    _page = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
      __proto__: null,
      GET,
      prerender
    }, Symbol.toStringTag, { value: "Module" }));
    page = /* @__PURE__ */ __name(() => _page, "page");
  }
});

// dist/_worker.js/chunks/Layout_fLnNkG_9.mjs
var $$Container, __freeze$2, __defProp$2, __template$2, _a$2, $$Astro$b, $$Astronav, $$Astro$a, $$MenuIcon, $$Astro$9, $$OpenIcon, $$Astro$8, $$CloseIcon, $$Astro$7, $$MenuItems, $$Astro$6, $$Dropdown, $$Astro$5, $$DropdownSubmenu, $$Astro$4, $$DropdownItems, __freeze$1, __defProp$1, __template$1, _a$1, $$Astro$3, $$StickyHeader, $$Astro$2, $$Navbar, __freeze, __defProp2, __template, _a, $$Footer, $$Astro$1, $$ViewTransitions, $$Astro, $$Layout;
var init_Layout_fLnNkG_9 = __esm({
  "dist/_worker.js/chunks/Layout_fLnNkG_9.mjs"() {
    "use strict";
    init_checked_fetch();
    init_modules_watch_stub();
    init_server_Den36nYv();
    globalThis.process ??= {};
    globalThis.process.env ??= {};
    $$Container = createComponent(($$result, $$props, $$slots) => {
      return renderTemplate`${maybeRenderHead()}<div class="max-w-screen-xl mx-auto px-6 lg:px-8 xl:px-10"> ${renderSlot($$result, $$slots["default"])} </div>`;
    }, "/home/abdi/Projects/Addition/Addition-Plus-Website/src/components/Container.astro", void 0);
    __freeze$2 = Object.freeze;
    __defProp$2 = Object.defineProperty;
    __template$2 = /* @__PURE__ */ __name((cooked, raw) => __freeze$2(__defProp$2(cooked, "raw", { value: __freeze$2(cooked.slice()) })), "__template$2");
    $$Astro$b = createAstro();
    $$Astronav = createComponent(($$result, $$props, $$slots) => {
      const Astro2 = $$result.createAstro($$Astro$b, $$props, $$slots);
      Astro2.self = $$Astronav;
      const { closeOnClick = false } = Astro2.props;
      return renderTemplate(_a$2 || (_a$2 = __template$2(["", " <script>(function(){", '\n["DOMContentLoaded", "astro:after-swap"].forEach((event) => {\n  document.addEventListener(event, addListeners);\n});\n\n// Function to clone and replace elements\nfunction cloneAndReplace(element) {\n  const clone = element.cloneNode(true);\n  element.parentNode.replaceChild(clone, element);\n}\n\nfunction addListeners() {\n  // Clean up existing listeners\n  const oldMenuButton = document.getElementById("astronav-menu");\n  if (oldMenuButton) {\n    cloneAndReplace(oldMenuButton);\n  }\n\n  const oldDropdownMenus = document.querySelectorAll(".astronav-dropdown");\n  oldDropdownMenus.forEach((menu) => {\n    cloneAndReplace(menu);\n  });\n\n  // Mobile nav toggle\n  const menuButton = document.getElementById("astronav-menu");\n  menuButton && menuButton.addEventListener("click", toggleMobileNav);\n\n  // Dropdown menus\n  const dropdownMenus = document.querySelectorAll(".astronav-dropdown");\n  dropdownMenus.forEach((menu) => {\n    const button = menu.querySelector("button");\n    button &&\n      button.addEventListener("click", (event) =>\n        toggleDropdownMenu(event, menu, dropdownMenus)\n      );\n\n    // Handle Submenu Dropdowns\n    const dropDownSubmenus = menu.querySelectorAll(\n      ".astronav-dropdown-submenu"\n    );\n\n    dropDownSubmenus.forEach((submenu) => {\n      const submenuButton = submenu.querySelector("button");\n      submenuButton &&\n        submenuButton.addEventListener("click", (event) => {\n          event.stopImmediatePropagation();\n          toggleSubmenuDropdown(event, submenu);\n        });\n    });\n  });\n\n  // Clicking away from dropdown will remove the dropdown class\n  document.addEventListener("click", closeAllDropdowns);\n\n  if (closeOnClick) {\n    handleCloseOnClick();\n  }\n}\n\nfunction toggleMobileNav() {\n  [...document.querySelectorAll(".astronav-toggle")].forEach((el) => {\n    el.classList.toggle("hidden");\n  });\n}\n\nfunction toggleDropdownMenu(event, menu, dropdownMenus) {\n  toggleMenu(menu);\n\n  // Close one dropdown when selecting another\n  Array.from(dropdownMenus)\n    .filter((el) => el !== menu && !menu.contains(el))\n    .forEach(closeMenu);\n\n  event.stopPropagation();\n}\n\nfunction toggleSubmenuDropdown(event, submenu) {\n  event.stopPropagation();\n  toggleMenu(submenu);\n\n  // Close sibling submenus at the same nesting level\n  const siblingSubmenus = submenu\n    .closest(".astronav-dropdown")\n    .querySelectorAll(".astronav-dropdown-submenu");\n  Array.from(siblingSubmenus)\n    .filter((el) => el !== submenu && !submenu.contains(el))\n    .forEach(closeMenu);\n}\n\nfunction closeAllDropdowns(event) {\n  const dropdownMenus = document.querySelectorAll(".dropdown-toggle");\n  const dropdownParent = document.querySelectorAll(\n    ".astronav-dropdown, .astronav-dropdown-submenu"\n  );\n  const isButtonInsideDropdown = [\n    ...document.querySelectorAll(\n      ".astronav-dropdown button, .astronav-dropdown-submenu button, #astronav-menu"\n    ),\n  ].some((button) => button.contains(event.target));\n  if (!isButtonInsideDropdown) {\n    dropdownMenus.forEach((d) => {\n      // console.log("I ran", d);\n      // if (!d.contains(event.target)) {\n      d.classList.remove("open");\n      d.removeAttribute("open");\n      d.classList.add("hidden");\n      // }\n    });\n    dropdownParent.forEach((d) => {\n      d.classList.remove("open");\n      d.removeAttribute("open");\n      d.setAttribute("aria-expanded", "false");\n    });\n  }\n}\n\nfunction toggleMenu(menu) {\n  menu.classList.toggle("open");\n  const expanded = menu.getAttribute("aria-expanded") === "true";\n  menu.setAttribute("aria-expanded", expanded ? "false" : "true");\n  menu.hasAttribute("open")\n    ? menu.removeAttribute("open")\n    : menu.setAttribute("open", "");\n\n  const dropdownToggle = menu.querySelector(".dropdown-toggle");\n  const dropdownExpanded = dropdownToggle.getAttribute("aria-expanded");\n  dropdownToggle.classList.toggle("hidden");\n  dropdownToggle.setAttribute(\n    "aria-expanded",\n    dropdownExpanded === "true" ? "false" : "true"\n  );\n}\n\nfunction closeMenu(menu) {\n  // console.log("closing", menu);\n  menu.classList.remove("open");\n  menu.removeAttribute("open");\n  menu.setAttribute("aria-expanded", "false");\n  const dropdownToggles = menu.querySelectorAll(".dropdown-toggle");\n  dropdownToggles.forEach((toggle) => {\n    toggle.classList.add("hidden");\n    toggle.setAttribute("aria-expanded", "false");\n  });\n}\n\nfunction handleCloseOnClick() {\n  const navMenuItems = document.querySelector(".astronav-items");\n  const navToggle = document.getElementById("astronav-menu");\n  const navLink = navMenuItems && navMenuItems.querySelectorAll("a");\n\n  const MenuIcons = navToggle.querySelectorAll(".astronav-toggle");\n\n  navLink &&\n    navLink.forEach((item) => {\n      item.addEventListener("click", () => {\n        navMenuItems?.classList.add("hidden");\n        MenuIcons.forEach((el) => {\n          el.classList.toggle("hidden");\n        });\n      });\n    });\n}\n})();<\/script>'])), renderSlot($$result, $$slots["default"]), defineScriptVars({ closeOnClick }));
    }, "/home/abdi/Projects/Addition/Addition-Plus-Website/node_modules/astro-navbar/src/Astronav.astro", void 0);
    $$Astro$a = createAstro();
    $$MenuIcon = createComponent(($$result, $$props, $$slots) => {
      const Astro2 = $$result.createAstro($$Astro$a, $$props, $$slots);
      Astro2.self = $$MenuIcon;
      const { class: className, ...rest } = Astro2.props;
      return renderTemplate`${maybeRenderHead()}<button id="astronav-menu" aria-label="Toggle Menu"> ${renderSlot($$result, $$slots["default"], renderTemplate` <svg fill="currentColor"${addAttribute([className], "class:list")} width="24" height="24" viewBox="0 0 24 24" xmlns="https://www.w3.org/2000/svg"${spreadAttributes(rest)}> <title>Toggle Menu</title> <path class="astronav-close-icon astronav-toggle hidden" fill-rule="evenodd" clip-rule="evenodd" d="M18.278 16.864a1 1 0 01-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 01-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 011.414-1.414l4.829 4.828 4.828-4.828a1 1 0 111.414 1.414l-4.828 4.829 4.828 4.828z"></path> <path class="astronav-open-icon astronav-toggle" fill-rule="evenodd" d="M4 5h16a1 1 0 010 2H4a1 1 0 110-2zm0 6h16a1 1 0 010 2H4a1 1 0 010-2zm0 6h16a1 1 0 010 2H4a1 1 0 010-2z"></path> </svg> `)} </button>`;
    }, "/home/abdi/Projects/Addition/Addition-Plus-Website/node_modules/astro-navbar/src/components/MenuIcon.astro", void 0);
    $$Astro$9 = createAstro();
    $$OpenIcon = createComponent(($$result, $$props, $$slots) => {
      const Astro2 = $$result.createAstro($$Astro$9, $$props, $$slots);
      Astro2.self = $$OpenIcon;
      const { class: className, ...rest } = Astro2.props;
      return renderTemplate`${maybeRenderHead()}<span${addAttribute(["astronav-open-icon astronav-toggle", className], "class:list")}${spreadAttributes(rest)}>${renderSlot($$result, $$slots["default"])}</span>`;
    }, "/home/abdi/Projects/Addition/Addition-Plus-Website/node_modules/astro-navbar/src/components/OpenIcon.astro", void 0);
    $$Astro$8 = createAstro();
    $$CloseIcon = createComponent(($$result, $$props, $$slots) => {
      const Astro2 = $$result.createAstro($$Astro$8, $$props, $$slots);
      Astro2.self = $$CloseIcon;
      const { class: className, ...rest } = Astro2.props;
      return renderTemplate`${maybeRenderHead()}<span${addAttribute(["astronav-close-icon astronav-toggle hidden", className], "class:list")}${spreadAttributes(rest)}> ${renderSlot($$result, $$slots["default"])} </span>`;
    }, "/home/abdi/Projects/Addition/Addition-Plus-Website/node_modules/astro-navbar/src/components/CloseIcon.astro", void 0);
    $$Astro$7 = createAstro();
    $$MenuItems = createComponent(($$result, $$props, $$slots) => {
      const Astro2 = $$result.createAstro($$Astro$7, $$props, $$slots);
      Astro2.self = $$MenuItems;
      const { class: className, ...rest } = Astro2.props;
      return renderTemplate`${maybeRenderHead()}<nav${addAttribute(["astronav-items astronav-toggle", className], "class:list")}${spreadAttributes(rest)}> ${renderSlot($$result, $$slots["default"])} </nav>`;
    }, "/home/abdi/Projects/Addition/Addition-Plus-Website/node_modules/astro-navbar/src/components/MenuItems.astro", void 0);
    $$Astro$6 = createAstro();
    $$Dropdown = createComponent(($$result, $$props, $$slots) => {
      const Astro2 = $$result.createAstro($$Astro$6, $$props, $$slots);
      Astro2.self = $$Dropdown;
      const { class: className, ...rest } = Astro2.props;
      return renderTemplate`${maybeRenderHead()}<menu${addAttribute(["astronav-dropdown", className], "class:list")}${spreadAttributes(rest)} aria-expanded="false">${renderSlot($$result, $$slots["default"])}</menu>`;
    }, "/home/abdi/Projects/Addition/Addition-Plus-Website/node_modules/astro-navbar/src/components/Dropdown.astro", void 0);
    $$Astro$5 = createAstro();
    $$DropdownSubmenu = createComponent(($$result, $$props, $$slots) => {
      const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
      Astro2.self = $$DropdownSubmenu;
      const { class: className, ...rest } = Astro2.props;
      return renderTemplate`${maybeRenderHead()}<div${addAttribute(["astronav-dropdown-submenu", className], "class:list")}${spreadAttributes(rest)} aria-expanded="false"> ${renderSlot($$result, $$slots["default"])} </div>`;
    }, "/home/abdi/Projects/Addition/Addition-Plus-Website/node_modules/astro-navbar/src/components/DropdownSubmenu.astro", void 0);
    $$Astro$4 = createAstro();
    $$DropdownItems = createComponent(($$result, $$props, $$slots) => {
      const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
      Astro2.self = $$DropdownItems;
      const { class: className, ...rest } = Astro2.props;
      return renderTemplate`${maybeRenderHead()}<div${addAttribute(["astronav-dropdown dropdown-toggle hidden", className], "class:list")}${spreadAttributes(rest)} aria-expanded="false"> ${renderSlot($$result, $$slots["default"])} </div>`;
    }, "/home/abdi/Projects/Addition/Addition-Plus-Website/node_modules/astro-navbar/src/components/DropdownItems.astro", void 0);
    __freeze$1 = Object.freeze;
    __defProp$1 = Object.defineProperty;
    __template$1 = /* @__PURE__ */ __name((cooked, raw) => __freeze$1(__defProp$1(cooked, "raw", { value: __freeze$1(cooked.slice()) })), "__template$1");
    $$Astro$3 = createAstro();
    $$StickyHeader = createComponent(($$result, $$props, $$slots) => {
      const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
      Astro2.self = $$StickyHeader;
      const {
        scrollY = 100,
        defaultClass = "",
        activeClass = "",
        class: className = "",
        ...rest
      } = Astro2.props;
      return renderTemplate(_a$1 || (_a$1 = __template$1(["", "<header", "", "> ", " </header> <script>(function(){", '\nlet scrollPos = 0;\nlet ticking = false;\n\nfunction OnScroll(scrollPos) {\n  const headers = document.querySelectorAll(".astronav-sticky-header");\n  const classArray = activeClass.split(" ");\n  const replaceArray = defaultClass.split(" ");\n\n  headers.forEach((header) => {\n    if (scrollPos > scrollY) {\n      header.classList.remove(...replaceArray);\n      header.classList.add("is-active", ...classArray);\n      header.setAttribute("active", "");\n    }\n    //reduce the scrollY to avoid flickering when scrolling up\n    if (scrollPos < Math.max(scrollY - 40, 10)) {\n      header.classList.remove("is-active", ...classArray);\n      header.classList.add(...replaceArray);\n      header.removeAttribute("active");\n    }\n  });\n}\n\n// Scroll event throttling as per MDN\n// https://developer.mozilla.org/en-US/docs/Web/API/Document/scroll_event\n\ndocument.addEventListener("scroll", (event) => {\n  scrollPos = window.scrollY;\n  if (!ticking) {\n    window.requestAnimationFrame(() => {\n      OnScroll(scrollPos);\n      ticking = false;\n    });\n\n    ticking = true;\n  }\n});\n})();<\/script>'])), maybeRenderHead(), addAttribute(["astronav-sticky-header", className, defaultClass], "class:list"), spreadAttributes(rest), renderSlot($$result, $$slots["default"]), defineScriptVars({ scrollY, defaultClass, activeClass }));
    }, "/home/abdi/Projects/Addition/Addition-Plus-Website/node_modules/astro-navbar/src/components/StickyHeader.astro", void 0);
    $$Astro$2 = createAstro();
    $$Navbar = createComponent(($$result, $$props, $$slots) => {
      const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
      Astro2.self = $$Navbar;
      const menuitems = [
        { href: "/about", label: "About us" },
        { href: "/#services", label: "Services" },
        { href: "/#projects", label: "Use Cases" },
        // { href: '/pricing', label: 'Pricing' },
        { href: "/articles", label: "Blog" }
      ];
      const navButton = { href: "#", label: "Request a quote" };
      return renderTemplate`${maybeRenderHead()}<div class="mt-20"> <nav class="w-full top-0 left-0 z-50 fixed bg-white"> ${renderComponent($$result, "Container", $$Container, {}, { "default": ($$result2) => renderTemplate` <header class="flex flex-col lg:flex-row justify-between items-center my-5"> ${renderComponent($$result2, "Astronav", $$Astronav, {}, { "default": ($$result3) => renderTemplate` <div class="flex w-full lg:w-auto items-center justify-between"> <a href="/" class="flex items-center space-x-3 rtl:space-x-reverse"> <img src="/Logo.svg" class="h-8" alt="Logo"> </a> <div class="block lg:hidden"> ${renderComponent($$result3, "MenuIcon", $$MenuIcon, { "class": "w-8 h-8 text-black" })} </div> </div> ${renderComponent($$result3, "MenuItems", $$MenuItems, { "class": "hidden w-full lg:w-auto mt-2 lg:flex lg:mt-0" }, { "default": ($$result4) => renderTemplate` <ul class="font-medium flex flex-col p-4 lg:p-0 mt-4 border rounded-lg lg:flex-row lg:space-x-8 lg:mt-0 lg:border-0"> ${menuitems.map((item, index) => renderTemplate`<li> <a${addAttribute(item.href, "href")} class="block py-2 px-3 text-black rounded lg:bg-transparent lg:p-0">${item.label}</a> </li>`)} <div class="lg:hidden flex items-center justify-center mt-3 gap-4"> <a class="px-9 py-5 rounded-2xl border border-zinc-900 bg-white hover:bg-black text-black hover:text-white inline-flex"${addAttribute(navButton.href, "href")} target="_blank"><h2 class="text-center text-xl font-normal leading-7">${navButton.label}</h2> </a> </div> </ul> ` })} ` })} <div> <div class="hidden lg:flex items-center gap-4"> <a class="px-9 py-5 rounded-2xl border border-zinc-900 bg-white hover:bg-black text-black hover:text-white inline-flex"${addAttribute(navButton.href, "href")} target="_blank"><h2 class="text-center text-xl font-normal leading-7">${navButton.label}</h2> </a> </div> </div> </header> ` })} </nav> </div>`;
    }, "/home/abdi/Projects/Addition/Addition-Plus-Website/src/components/Navbar.astro", void 0);
    __freeze = Object.freeze;
    __defProp2 = Object.defineProperty;
    __template = /* @__PURE__ */ __name((cooked, raw) => __freeze(__defProp2(cooked, "raw", { value: __freeze(raw || cooked.slice()) })), "__template");
    $$Footer = createComponent(($$result, $$props, $$slots) => {
      return renderTemplate(_a || (_a = __template(["", '<footer class="bg-[#1E40AF] bg-fixed bg-bottom text-white"> ', ' </footer> <script>\n    const year = new Date().getFullYear();\n    document.getElementById("currentYear").innerHTML = `${year}`;\n<\/script>'], ["", '<footer class="bg-[#1E40AF] bg-fixed bg-bottom text-white"> ', ' </footer> <script>\n    const year = new Date().getFullYear();\n    document.getElementById("currentYear").innerHTML = \\`\\${year}\\`;\n<\/script>'])), maybeRenderHead(), renderComponent($$result, "Container", $$Container, {}, { "default": ($$result2) => renderTemplate` <div class="py-6"> <div class="flex flex-col items-center justify-between md:flex-row"> <div class="flex items-center space-x-3 rtl:space-x-reverse"> <img class="w-auto" src="/Logo.svg" alt="Logo"> </div> <div class="flex mt-4 md:m-0"> <div class="-mx-4">
@ <span id="currentYear"></span> Made with ❤️ at Addition+</div> </div> </div> </div> ` }));
    }, "/home/abdi/Projects/Addition/Addition-Plus-Website/src/components/Footer.astro", void 0);
    $$Astro$1 = createAstro();
    $$ViewTransitions = createComponent(($$result, $$props, $$slots) => {
      const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
      Astro2.self = $$ViewTransitions;
      const { fallback = "animate" } = Astro2.props;
      return renderTemplate`<meta name="astro-view-transitions-enabled" content="true"><meta name="astro-view-transitions-fallback"${addAttribute(fallback, "content")}>`;
    }, "/home/abdi/Projects/Addition/Addition-Plus-Website/node_modules/astro/components/ViewTransitions.astro", void 0);
    $$Astro = createAstro();
    $$Layout = createComponent(($$result, $$props, $$slots) => {
      const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
      Astro2.self = $$Layout;
      return renderTemplate`<html lang="en"> <head><meta charset="UTF-8"><meta name="description" content="Astro description"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>Addition +</title><meta name="description" content="Official website of Addition Plus LLC."><link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&display=swap" rel="stylesheet">${renderComponent($$result, "ViewTransitions", $$ViewTransitions, {})}${renderHead()}</head> <body class="bg-white font-SpaceGrotesk " style="scroll-behavior: smooth;"> ${renderComponent($$result, "Navbar", $$Navbar, {})} ${renderSlot($$result, $$slots["default"])} ${renderComponent($$result, "Footer", $$Footer, {})} </body></html>`;
    }, "/home/abdi/Projects/Addition/Addition-Plus-Website/src/layouts/Layout.astro", void 0);
  }
});

// dist/_worker.js/pages/404.astro.mjs
var astro_exports = {};
__export(astro_exports, {
  page: () => page2,
  renderers: () => renderers
});
var $$404, $$file, $$url, _page2, page2;
var init_astro = __esm({
  "dist/_worker.js/pages/404.astro.mjs"() {
    "use strict";
    init_checked_fetch();
    init_modules_watch_stub();
    init_server_Den36nYv();
    init_Layout_fLnNkG_9();
    init_renderers();
    globalThis.process ??= {};
    globalThis.process.env ??= {};
    $$404 = createComponent(($$result, $$props, $$slots) => {
      return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Welcome to My site" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="space-y-20"> ${renderComponent($$result2, "Container", $$Container, {}, { "default": ($$result3) => renderTemplate` <div class="relative flex flex-col-reverse items-center justify-center md:flex-row" id="hero"> <div class="row items-center py-5 md:pb-20 md:pt-10"> <div class="justify-center flex py-5"> <img src="/404.svg" width="50%" alt="Hero"> </div> <div class="text-center space-y-10"> <h2 class="text-2xl font-medium leading-none md:text-4xl">Sorry, we couldn't find the page you were looking for</h2> <a class="px-9 py-5 bg-zinc-900 hover:bg-white text-white hover:text-black border rounded-2xl justify-items-center md:justify-items-start gap-2.5 inline-flex" rel="noopener noreferrer" href="./" target="_blank"> <h2 class="text-center text-xl font-normal leading-7">Go Back Home</h2> </a> </div> </div> </div> ` })} </main> ` })}`;
    }, "/home/abdi/Projects/Addition/Addition-Plus-Website/src/pages/404.astro", void 0);
    $$file = "/home/abdi/Projects/Addition/Addition-Plus-Website/src/pages/404.astro";
    $$url = "/404";
    _page2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
      __proto__: null,
      default: $$404,
      file: $$file,
      url: $$url
    }, Symbol.toStringTag, { value: "Module" }));
    page2 = /* @__PURE__ */ __name(() => _page2, "page");
  }
});

// dist/_worker.js/pages/about.astro.mjs
var about_astro_exports = {};
__export(about_astro_exports, {
  page: () => page3,
  renderers: () => renderers
});
var $$About, $$file2, $$url2, _page3, page3;
var init_about_astro = __esm({
  "dist/_worker.js/pages/about.astro.mjs"() {
    "use strict";
    init_checked_fetch();
    init_modules_watch_stub();
    init_server_Den36nYv();
    init_Layout_fLnNkG_9();
    init_renderers();
    globalThis.process ??= {};
    globalThis.process.env ??= {};
    $$About = createComponent(($$result, $$props, $$slots) => {
      return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Welcome to My site" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="space-y-20"> ${renderComponent($$result2, "Container", $$Container, {}, { "default": ($$result3) => renderTemplate` <div class="relative flex flex-col-reverse items-center md:flex-row" id="hero"> <div class="row items-center py-5 md:pb-20 md:pt-10"> <div class="text-center space-y-10"> <h2 class="text-5xl font-medium leading-none md:text-6xl">We Transform Ideas<br> into Impactful<br> Digital Products</h2> <p class="mt-6 mb-8  text-xl font-normal leading-7 sm:mb-12">Addition+ is a team of passionate digital experts dedicated to creating impactful solutions across web, mobile, and AI technologies. With a focus on innovation and precision, we bring together the best tools and talent to turn your ideas into powerful digital products.</p> <a class="px-9 py-5 bg-zinc-900 hover:bg-white text-white hover:text-black border rounded-2xl justify-items-center md:justify-items-start gap-2.5 inline-flex" rel="noopener noreferrer" href="#" target="_blank"> <h2 class="text-center text-xl font-normal leading-7">Get A Free Quote</h2> </a> </div> </div> </div>  ` })} <br> <!-- <Team/> --> <br> </main> ` })}`;
    }, "/home/abdi/Projects/Addition/Addition-Plus-Website/src/pages/about.astro", void 0);
    $$file2 = "/home/abdi/Projects/Addition/Addition-Plus-Website/src/pages/about.astro";
    $$url2 = "/about";
    _page3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
      __proto__: null,
      default: $$About,
      file: $$file2,
      url: $$url2
    }, Symbol.toStringTag, { value: "Module" }));
    page3 = /* @__PURE__ */ __name(() => _page3, "page");
  }
});

// dist/_worker.js/chunks/_astro_data-layer-content_tqJQiZwR.mjs
var astro_data_layer_content_tqJQiZwR_exports = {};
__export(astro_data_layer_content_tqJQiZwR_exports, {
  default: () => _astro_dataLayerContent
});
var _astro_dataLayerContent;
var init_astro_data_layer_content_tqJQiZwR = __esm({
  "dist/_worker.js/chunks/_astro_data-layer-content_tqJQiZwR.mjs"() {
    "use strict";
    init_checked_fetch();
    init_modules_watch_stub();
    globalThis.process ??= {};
    globalThis.process.env ??= {};
    _astro_dataLayerContent = /* @__PURE__ */ new Map();
  }
});

// dist/_worker.js/chunks/_astro_asset-imports_Dno0vHp6.mjs
var astro_asset_imports_Dno0vHp6_exports = {};
__export(astro_asset_imports_Dno0vHp6_exports, {
  default: () => _astro_assetImports
});
var _astro_assetImports;
var init_astro_asset_imports_Dno0vHp6 = __esm({
  "dist/_worker.js/chunks/_astro_asset-imports_Dno0vHp6.mjs"() {
    "use strict";
    init_checked_fetch();
    init_modules_watch_stub();
    globalThis.process ??= {};
    globalThis.process.env ??= {};
    _astro_assetImports = /* @__PURE__ */ new Map();
  }
});

// dist/_worker.js/chunks/How to quickly deploy a static website_D5tqu43_.mjs
var How_to_quickly_deploy_a_static_website_D5tqu43_exports = {};
__export(How_to_quickly_deploy_a_static_website_D5tqu43_exports, {
  _internal: () => _internal,
  body: () => body,
  collection: () => collection,
  data: () => data,
  id: () => id,
  slug: () => slug
});
var id, collection, slug, body, data, _internal;
var init_How_to_quickly_deploy_a_static_website_D5tqu43 = __esm({
  "dist/_worker.js/chunks/How to quickly deploy a static website_D5tqu43_.mjs"() {
    "use strict";
    init_checked_fetch();
    init_modules_watch_stub();
    globalThis.process ??= {};
    globalThis.process.env ??= {};
    id = "How to quickly deploy a static website.md";
    collection = "blog";
    slug = "how-to-quickly-deploy-a-static-website";
    body = "\nStatic websites are now used to bootstrap lots of websites and are becoming the basis for a variety of tools that even influence both web designers and developers influence both web designers and developers. Static websites are now used to bootstrap lots of websites and are becoming the basis for a variety of tools that even influence both web designers and developers influence both web designers and developers. Static websites are now used to bootstrap lots of websites and are becoming the basis for a variety of tools that even influence both web designers and developers influence both web designers and developers. Static websites are now used to bootstrap lots of websites and are becoming the basis for a variety of tools that even influence both web designers and developers influence both web designers and developers. Static websites are now used to bootstrap lots of websites and are becoming the basis for a variety of tools that even influence both web designers and developers influence both web designers and developers.\n\n";
    data = { title: "How to quickly deploy a static website", pubDate: /* @__PURE__ */ new Date(17057088e5), author: "Jese Leos", authImage: "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png", image: "image1.png", summary: "Static websites are now used to bootstrap lots of websites and are becoming the basis for a variety of tools that even influence both web designers and developers influence both web designers and developers.", type: "Tutorial" };
    _internal = {
      type: "content",
      filePath: "/home/abdi/Projects/Addition/Addition-Plus-Website/src/content/blog/How to quickly deploy a static website.md",
      rawData: void 0
    };
  }
});

// dist/_worker.js/chunks/cannon-excellence_BOiohCMI.mjs
var cannon_excellence_BOiohCMI_exports = {};
__export(cannon_excellence_BOiohCMI_exports, {
  _internal: () => _internal2,
  body: () => body2,
  collection: () => collection2,
  data: () => data2,
  id: () => id2,
  slug: () => slug2
});
var id2, collection2, slug2, body2, data2, _internal2;
var init_cannon_excellence_BOiohCMI = __esm({
  "dist/_worker.js/chunks/cannon-excellence_BOiohCMI.mjs"() {
    "use strict";
    init_checked_fetch();
    init_modules_watch_stub();
    globalThis.process ??= {};
    globalThis.process.env ??= {};
    id2 = "cannon-excellence.md";
    collection2 = "blog";
    slug2 = "capturing-lifes-moments-with-canon-excellence";
    body2 = "\nFor photographers and enthusiasts alike, Canon has been a symbol of excellence in the world of photography for decades. In 2024, Canon continues to lead the way in innovation, enabling us to capture life's most precious moments with unparalleled quality and precision. Let's explore the world of photography and how Canon's excellence plays a pivotal role.\n\n## **1. Cutting-Edge Camera Technology**\n\nCanon is renowned for its cutting-edge camera technology. From DSLRs to mirrorless cameras, Canon consistently pushes the boundaries of what's possible in photography. High-resolution sensors, advanced autofocus systems, and remarkable image processing ensure that every shot is a masterpiece.\n\n## **2. Diverse Lens Ecosystem**\n\nCanon boasts a diverse and extensive lens ecosystem that caters to photographers of all levels. Whether you're into portrait photography, wildlife, or landscape, Canon offers a lens for every occasion. The L-series lenses are a testament to Canon's commitment to optical excellence.\n\n## **3. Innovative Imaging Solutions**\n\nCanon's imaging solutions extend beyond cameras and lenses. Their printers, scanners, and image editing software empower photographers to bring their vision to life. Canon's color accuracy and print quality are unmatched in the industry.\n\n## **4. Professional-Grade Video Recording**\n\nCanon cameras are not just for photography; they excel in videography too. From vlogging to cinematic filmmaking, Canon's video capabilities are a favorite among content creators. Dual Pixel Autofocus and high-quality 4K recording are staples of Canon's video prowess.\n\n## **5. Commitment to Sustainability**\n\nCanon is committed to environmental sustainability. They implement eco-friendly practices in manufacturing and recycling programs. Choosing Canon means supporting a company that cares about the planet.\n\n## **6. User-Friendly Interface**\n\nCanon's user-friendly interfaces make photography accessible to beginners and professionals alike. Intuitive menus, touchscreen controls, and customizable settings ensure a seamless shooting experience.\n\n## **7. Reliability and Durability**\n\nCanon's cameras are built to last. They can withstand challenging environments and offer durability that professional photographers demand. Canon users know they can rely on their gear in any situation.\n\n## **8. Photography Education**\n\nCanon supports photography education with workshops, tutorials, and online resources. They empower aspiring photographers to enhance their skills and make the most of Canon's equipment.\n\n## **9. Community and Inspiration**\n\nCanon's photography community is vibrant and inspiring. Photographers share their work, tips, and experiences, creating a sense of camaraderie among enthusiasts and professionals.\n\n## **10. Innovation in the Digital Era**\n\nIn a rapidly evolving digital era, Canon consistently adapts and innovates. They embrace new technologies like AI and connectivity to enhance the photographic experience.\n\nIn conclusion, Canon's commitment to excellence in photography is unwavering. Whether you're a professional photographer, an aspiring enthusiast, or someone who simply loves capturing life's moments, Canon's technology and innovation empower you to do so\n";
    data2 = { title: "Capturing Life's Moments with Canon Excellence", pubDate: /* @__PURE__ */ new Date(17052768e5), author: "Bonnie Green", authImage: "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/bonnie-green.png", image: "image4.png", summary: "Canon has been a symbol of excellence in the world of photography for decades. In 2024, Canon continues to lead the way in innovation...", type: "Article" };
    _internal2 = {
      type: "content",
      filePath: "/home/abdi/Projects/Addition/Addition-Plus-Website/src/content/blog/cannon-excellence.md",
      rawData: void 0
    };
  }
});

// dist/_worker.js/chunks/cutting-edge-tablets_CDLNkaVM.mjs
var cutting_edge_tablets_CDLNkaVM_exports = {};
__export(cutting_edge_tablets_CDLNkaVM_exports, {
  _internal: () => _internal3,
  body: () => body3,
  collection: () => collection3,
  data: () => data3,
  id: () => id3,
  slug: () => slug3
});
var id3, collection3, slug3, body3, data3, _internal3;
var init_cutting_edge_tablets_CDLNkaVM = __esm({
  "dist/_worker.js/chunks/cutting-edge-tablets_CDLNkaVM.mjs"() {
    "use strict";
    init_checked_fetch();
    init_modules_watch_stub();
    globalThis.process ??= {};
    globalThis.process.env ??= {};
    id3 = "cutting-edge-tablets.md";
    collection3 = "blog";
    slug3 = "unleash-creativity-with-these-cutting-edge-tablets";
    body3 = "\nIn the world of digital creativity, tablets have become indispensable tools for artists, designers, and anyone seeking to unleash their artistic potential. In 2024, the market is brimming with cutting-edge tablets that offer new dimensions of creativity. Let's dive into the exciting realm of tablet technology and discover the tools that can help you bring your artistic visions to life.\n\n## **1. Remarkable Displays**\n\nCutting-edge tablets feature remarkable displays with high resolutions, wide color gamuts, and exceptional brightness. Whether you're illustrating, editing photos, or 3D modeling, these displays provide true-to-life visuals and precise color accuracy.\n\n## **2. Powerful Processing Power**\n\nThe heart of a cutting-edge tablet is its processing power. With advanced processors and ample RAM, these tablets can handle resource-intensive tasks like rendering, video editing, and complex digital painting with ease.\n\n## **3. Innovative Stylus Technology**\n\nStylus technology has evolved significantly. Cutting-edge tablets come with styluses that offer precise control, pressure sensitivity, and low latency. They mimic the feel of traditional drawing and provide an intuitive creative experience.\n\n## **4. Versatile Software Compatibility**\n\nThese tablets are compatible with a wide range of creative software, from industry-standard programs like Adobe Creative Cloud to specialized apps for digital art, animation, and 3D modeling. You have the flexibility to choose the tools that suit your creative needs.\n\n## **5. 3D Modeling and Sculpting**\n\nFor those in the 3D modeling and sculpting realm, cutting-edge tablets support powerful applications that allow you to sculpt, texture, and animate your creations in a tactile and immersive way.\n\n## **6. Digital Painting and Illustration**\n\nArtists can explore a vast canvas of possibilities with digital painting and illustration. Cutting-edge tablets offer natural brush strokes, layers, and a variety of brushes to achieve stunning artistic results.\n\n## **7. Photo and Video Editing**\n\nPhotographers and videographers benefit from advanced tablets for on-the-go editing. High-resolution screens and touch-based controls make editing a breeze, whether you're enhancing photos or cutting video footage.\n\n## **8. Portability and Connectivity**\n\nCutting-edge tablets are designed for portability, making them ideal for creatives on the move. They offer a range of connectivity options, including USB-C, Bluetooth, and Wi-Fi, to streamline your workflow.\n\n## **9. Augmented Reality (AR)**\n\nSome cutting-edge tablets integrate augmented reality features, allowing artists to overlay digital creations onto the physical world, opening up new possibilities for interactive and immersive experiences.\n\n## **10. Cloud Integration**\n\nCloud integration ensures that your work is accessible from anywhere. You can sync your projects across devices and collaborate with others seamlessly.\n\nIn conclusion, if you're looking to unleash your creativity and take your digital artistry to new heights, cutting-edge tablets are your canvas. Their remarkable displays, powerful processing, and innovative stylus technology provide the tools you need to bring your creative visions to life. As we embark on the creative journey of 2024, explore the world of cutting-edge tablets and let your imagination soar.\n";
    data3 = { title: "Unleash Creativity With These Cutting-Edge Tablets", pubDate: /* @__PURE__ */ new Date(17051904e5), author: "Bonnie Green", authImage: "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/bonnie-green.png", image: "image5.png", summary: "In the world of digital creativity, tablets have become indispensable tools for artists, designers, and anyone seeking to unleash their artistic potential.", type: "Article" };
    _internal3 = {
      type: "content",
      filePath: "/home/abdi/Projects/Addition/Addition-Plus-Website/src/content/blog/cutting-edge-tablets.md",
      rawData: void 0
    };
  }
});

// dist/_worker.js/chunks/elevate-your-mobile-experience_C9ooJEK7.mjs
var elevate_your_mobile_experience_C9ooJEK7_exports = {};
__export(elevate_your_mobile_experience_C9ooJEK7_exports, {
  _internal: () => _internal4,
  body: () => body4,
  collection: () => collection4,
  data: () => data4,
  id: () => id4,
  slug: () => slug4
});
var id4, collection4, slug4, body4, data4, _internal4;
var init_elevate_your_mobile_experience_C9ooJEK7 = __esm({
  "dist/_worker.js/chunks/elevate-your-mobile-experience_C9ooJEK7.mjs"() {
    "use strict";
    init_checked_fetch();
    init_modules_watch_stub();
    globalThis.process ??= {};
    globalThis.process.env ??= {};
    id4 = "elevate-your-mobile-experience.md";
    collection4 = "blog";
    slug4 = "elevate-your-mobile-experience-with-samsung";
    body4 = "\nIn the ever-evolving world of mobile technology, Samsung has consistently delivered cutting-edge devices that redefine the way we experience the digital world. If you're looking to elevate your mobile experience in 2024, here's why Samsung should be at the top of your list.\n\n## **1. Innovative Display Technology**\n\nSamsung's mobile devices are renowned for their stunning displays. With advancements in AMOLED and Dynamic AMOLED technology, Samsung offers vibrant colors, deep blacks, and sharp resolutions. Whether you're streaming videos, playing games, or working on productivity apps, the visual experience is unparalleled.\n\n## **2. Powerful Performance**\n\nSamsung equips its smartphones with powerful processors and ample RAM, ensuring smooth multitasking and efficient performance. Whether you're a mobile gamer, content creator, or business professional, Samsung devices can handle your tasks with ease.\n\n## **3. Impressive Camera Systems**\n\nCapture life's moments in stunning detail with Samsung's camera systems. From high-resolution main cameras to ultra-wide and telephoto lenses, Samsung devices provide versatile photography options. Features like AI enhancements and night mode deliver exceptional results in various lighting conditions.\n\n## **4. 5G Connectivity**\n\nStay at the forefront of connectivity with 5G-enabled Samsung devices. Enjoy lightning-fast download and upload speeds, low latency, and seamless streaming. Whether you're working remotely or enjoying online entertainment, 5G ensures a lag-free experience.\n\n## **5. Long-lasting Battery Life**\n\nSamsung understands the importance of battery life. Their devices come equipped with large batteries that can last all day. With optimizations for power efficiency and fast charging capabilities, you can stay connected without interruptions.\n\n## **6. Secure and User-Friendly**\n\nSamsung prioritizes security with features like Samsung Knox, ensuring your data is protected. Additionally, their user-friendly interface, One UI, offers a smooth and intuitive user experience.\n\n## **7. Ecosystem Integration**\n\nIf you're already part of the Samsung ecosystem, their devices seamlessly integrate with each other. Share content across devices, sync your data, and enjoy a cohesive digital experience.\n\n## **8. Ongoing Software Support**\n\nSamsung provides regular software updates and security patches to keep your device running smoothly and protected from potential vulnerabilities.\n\n## **9. Eco-Friendly Initiatives**\n\nSamsung is committed to sustainability. They strive to reduce their environmental footprint by using eco-friendly materials and implementing recycling programs.\n\n## **10. Wide Range of Options**\n\nSamsung offers a wide range of devices to cater to various needs and budgets. Whether you prefer flagship models or more budget-friendly options, there's a Samsung device for you.\n\nIn conclusion, if you're looking to elevate your mobile experience in 2024, Samsung should be your go-to choice. Their commitment to innovation, performance, and user satisfaction makes them a leader in the mobile technology industry. Explore the Samsung ecosystem and discover how it can enhance your digital lifestyle.\n";
    data4 = { title: "Our first project with Astro", pubDate: /* @__PURE__ */ new Date(17054496e5), author: "Bonnie Green", authImage: "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/bonnie-green.png", image: "image3.png", summary: "In the ever-evolving world of mobile technology, Samsung has consistently delivered cutting-edge devices that redefine the way we experience the digital world.", type: "Article" };
    _internal4 = {
      type: "content",
      filePath: "/home/abdi/Projects/Addition/Addition-Plus-Website/src/content/blog/elevate-your-mobile-experience.md",
      rawData: void 0
    };
  }
});

// dist/_worker.js/chunks/guardian-of-the-digital-realm_BZNTAlFU.mjs
var guardian_of_the_digital_realm_BZNTAlFU_exports = {};
__export(guardian_of_the_digital_realm_BZNTAlFU_exports, {
  _internal: () => _internal5,
  body: () => body5,
  collection: () => collection5,
  data: () => data5,
  id: () => id5,
  slug: () => slug5
});
var id5, collection5, slug5, body5, data5, _internal5;
var init_guardian_of_the_digital_realm_BZNTAlFU = __esm({
  "dist/_worker.js/chunks/guardian-of-the-digital-realm_BZNTAlFU.mjs"() {
    "use strict";
    init_checked_fetch();
    init_modules_watch_stub();
    globalThis.process ??= {};
    globalThis.process.env ??= {};
    id5 = "guardian-of-the-digital-realm.md";
    collection5 = "blog";
    slug5 = "guardian-of-the-digital-realm-web-security";
    body5 = "\nIn today's interconnected world, where data breaches and cyber threats are on the rise, web security has become paramount. As the guardians of the digital realm, it's our responsibility to protect sensitive information, maintain user trust, and ensure the integrity of online systems. Let's dive into the world of web security and explore the key principles that every developer should embrace.\n\n## **1. Authentication and Authorization**\n\n**Authentication** is the process of verifying the identity of users or systems accessing your web applications. Implement strong authentication mechanisms, such as multi-factor authentication (MFA), to prevent unauthorized access.\n\n**Authorization**, on the other hand, determines what actions authenticated users are allowed to perform. Employ role-based access control (RBAC) and least privilege principles to ensure users have only the necessary permissions.\n\n## **2. Data Encryption**\n\nEncrypt sensitive data both at rest and in transit. Use protocols like HTTPS to secure data during transmission and employ strong encryption algorithms to protect data stored on servers. Regularly update encryption methods to stay ahead of emerging threats.\n\n## **3. Input Validation and Sanitization**\n\nAlways validate and sanitize user inputs to prevent SQL injection, cross-site scripting (XSS), and other injection attacks. Implement server-side validation and use libraries that offer protection against common vulnerabilities.\n\n## **4. Patch Management**\n\nStay vigilant about software and framework updates. Vulnerabilities often arise from outdated components. Establish a patch management process to apply security patches promptly and regularly.\n\n## **5. Security Headers**\n\nUtilize security headers in your web applications to mitigate common web attacks. Headers like Content Security Policy (CSP), X-Content-Type-Options, and X-Frame-Options can add an extra layer of protection against cross-site scripting and clickjacking attacks.\n\n## **6. Web Application Firewall (WAF)**\n\nConsider implementing a Web Application Firewall (WAF) to filter and monitor incoming traffic. A WAF can help identify and block malicious requests before they reach your application.\n\n## **7. Security Testing**\n\nRegularly conduct security assessments, including penetration testing and code reviews, to identify and address vulnerabilities. Automated scanning tools can also help discover potential issues.\n\n## **8. Logging and Monitoring**\n\nMaintain comprehensive logs of application activities and set up real-time monitoring. Monitoring allows you to detect and respond to security incidents promptly.\n\n## **9. User Education**\n\nEducate your users about best security practices, such as creating strong passwords, recognizing phishing attempts, and staying vigilant online. Informed users are your allies in the battle against cyber threats.\n\n## **10. Incident Response Plan**\n\nPrepare for the worst-case scenario with a well-defined incident response plan. This plan should outline the steps to take when a security breach occurs, minimizing damage and downtime.\n\nAs developers and stewards of the digital realm, our commitment to web security is not optional; it's a necessity. By following these principles and staying informed about emerging threats, we can safeguard the digital world and protect the trust of users and organizations alike. Let's remain vigilant in our role as guardians of web security.\n";
    data5 = { title: "Guardian of the Digital Realm: Web Security", pubDate: /* @__PURE__ */ new Date(17051904e5), author: "Jese Leos", authImage: "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png", image: "image2.png", summary: "In today's interconnected world, where data breaches and cyber threats are on the rise, web security has become paramount. As the guardians of the digital realm...", type: "Tutorial" };
    _internal5 = {
      type: "content",
      filePath: "/home/abdi/Projects/Addition/Addition-Plus-Website/src/content/blog/guardian-of-the-digital-realm.md",
      rawData: void 0
    };
  }
});

// dist/_worker.js/chunks/How to quickly deploy a static website_DcGe3oLv.mjs
var How_to_quickly_deploy_a_static_website_DcGe3oLv_exports = {};
__export(How_to_quickly_deploy_a_static_website_DcGe3oLv_exports, {
  Content: () => Content,
  compiledContent: () => compiledContent,
  default: () => Content,
  file: () => file,
  frontmatter: () => frontmatter,
  getHeadings: () => getHeadings,
  rawContent: () => rawContent,
  url: () => url
});
function rawContent() {
  return "\nStatic websites are now used to bootstrap lots of websites and are becoming the basis for a variety of tools that even influence both web designers and developers influence both web designers and developers. Static websites are now used to bootstrap lots of websites and are becoming the basis for a variety of tools that even influence both web designers and developers influence both web designers and developers. Static websites are now used to bootstrap lots of websites and are becoming the basis for a variety of tools that even influence both web designers and developers influence both web designers and developers. Static websites are now used to bootstrap lots of websites and are becoming the basis for a variety of tools that even influence both web designers and developers influence both web designers and developers. Static websites are now used to bootstrap lots of websites and are becoming the basis for a variety of tools that even influence both web designers and developers influence both web designers and developers.\n\n";
}
function compiledContent() {
  return html;
}
function getHeadings() {
  return [];
}
var html, frontmatter, file, url, Content;
var init_How_to_quickly_deploy_a_static_website_DcGe3oLv = __esm({
  "dist/_worker.js/chunks/How to quickly deploy a static website_DcGe3oLv.mjs"() {
    "use strict";
    init_checked_fetch();
    init_modules_watch_stub();
    init_server_Den36nYv();
    globalThis.process ??= {};
    globalThis.process.env ??= {};
    html = "<p>Static websites are now used to bootstrap lots of websites and are becoming the basis for a variety of tools that even influence both web designers and developers influence both web designers and developers. Static websites are now used to bootstrap lots of websites and are becoming the basis for a variety of tools that even influence both web designers and developers influence both web designers and developers. Static websites are now used to bootstrap lots of websites and are becoming the basis for a variety of tools that even influence both web designers and developers influence both web designers and developers. Static websites are now used to bootstrap lots of websites and are becoming the basis for a variety of tools that even influence both web designers and developers influence both web designers and developers. Static websites are now used to bootstrap lots of websites and are becoming the basis for a variety of tools that even influence both web designers and developers influence both web designers and developers.</p>";
    frontmatter = { "title": "How to quickly deploy a static website", "pubDate": "2024-01-20T00:00:00.000Z", "author": "Jese Leos", "authImage": "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png", "image": "image1.png", "slug": "how-to-quickly-deploy-a-static-website", "summary": "Static websites are now used to bootstrap lots of websites and are becoming the basis for a variety of tools that even influence both web designers and developers influence both web designers and developers.", "type": "Tutorial" };
    file = "/home/abdi/Projects/Addition/Addition-Plus-Website/src/content/blog/How to quickly deploy a static website.md";
    url = void 0;
    __name(rawContent, "rawContent");
    __name(compiledContent, "compiledContent");
    __name(getHeadings, "getHeadings");
    Content = createComponent((result, _props, slots) => {
      const { layout, ...content } = frontmatter;
      content.file = file;
      content.url = url;
      return renderTemplate`${maybeRenderHead()}${unescapeHTML(html)}`;
    });
  }
});

// dist/_worker.js/chunks/How to quickly deploy a static website_DQuK3059.mjs
var How_to_quickly_deploy_a_static_website_DQuK3059_exports = {};
__export(How_to_quickly_deploy_a_static_website_DQuK3059_exports, {
  default: () => defaultMod
});
async function getMod() {
  return Promise.resolve().then(() => (init_How_to_quickly_deploy_a_static_website_DcGe3oLv(), How_to_quickly_deploy_a_static_website_DcGe3oLv_exports));
}
var collectedLinks, collectedStyles, collectedScripts, defaultMod;
var init_How_to_quickly_deploy_a_static_website_DQuK3059 = __esm({
  "dist/_worker.js/chunks/How to quickly deploy a static website_DQuK3059.mjs"() {
    "use strict";
    init_checked_fetch();
    init_modules_watch_stub();
    globalThis.process ??= {};
    globalThis.process.env ??= {};
    __name(getMod, "getMod");
    collectedLinks = [];
    collectedStyles = [];
    collectedScripts = [];
    defaultMod = { __astroPropagation: true, getMod, collectedLinks, collectedStyles, collectedScripts };
  }
});

// dist/_worker.js/chunks/cannon-excellence_CDLb-1ug.mjs
var cannon_excellence_CDLb_1ug_exports = {};
__export(cannon_excellence_CDLb_1ug_exports, {
  Content: () => Content2,
  compiledContent: () => compiledContent2,
  default: () => Content2,
  file: () => file2,
  frontmatter: () => frontmatter2,
  getHeadings: () => getHeadings2,
  rawContent: () => rawContent2,
  url: () => url2
});
function rawContent2() {
  return "\nFor photographers and enthusiasts alike, Canon has been a symbol of excellence in the world of photography for decades. In 2024, Canon continues to lead the way in innovation, enabling us to capture life's most precious moments with unparalleled quality and precision. Let's explore the world of photography and how Canon's excellence plays a pivotal role.\n\n## **1. Cutting-Edge Camera Technology**\n\nCanon is renowned for its cutting-edge camera technology. From DSLRs to mirrorless cameras, Canon consistently pushes the boundaries of what's possible in photography. High-resolution sensors, advanced autofocus systems, and remarkable image processing ensure that every shot is a masterpiece.\n\n## **2. Diverse Lens Ecosystem**\n\nCanon boasts a diverse and extensive lens ecosystem that caters to photographers of all levels. Whether you're into portrait photography, wildlife, or landscape, Canon offers a lens for every occasion. The L-series lenses are a testament to Canon's commitment to optical excellence.\n\n## **3. Innovative Imaging Solutions**\n\nCanon's imaging solutions extend beyond cameras and lenses. Their printers, scanners, and image editing software empower photographers to bring their vision to life. Canon's color accuracy and print quality are unmatched in the industry.\n\n## **4. Professional-Grade Video Recording**\n\nCanon cameras are not just for photography; they excel in videography too. From vlogging to cinematic filmmaking, Canon's video capabilities are a favorite among content creators. Dual Pixel Autofocus and high-quality 4K recording are staples of Canon's video prowess.\n\n## **5. Commitment to Sustainability**\n\nCanon is committed to environmental sustainability. They implement eco-friendly practices in manufacturing and recycling programs. Choosing Canon means supporting a company that cares about the planet.\n\n## **6. User-Friendly Interface**\n\nCanon's user-friendly interfaces make photography accessible to beginners and professionals alike. Intuitive menus, touchscreen controls, and customizable settings ensure a seamless shooting experience.\n\n## **7. Reliability and Durability**\n\nCanon's cameras are built to last. They can withstand challenging environments and offer durability that professional photographers demand. Canon users know they can rely on their gear in any situation.\n\n## **8. Photography Education**\n\nCanon supports photography education with workshops, tutorials, and online resources. They empower aspiring photographers to enhance their skills and make the most of Canon's equipment.\n\n## **9. Community and Inspiration**\n\nCanon's photography community is vibrant and inspiring. Photographers share their work, tips, and experiences, creating a sense of camaraderie among enthusiasts and professionals.\n\n## **10. Innovation in the Digital Era**\n\nIn a rapidly evolving digital era, Canon consistently adapts and innovates. They embrace new technologies like AI and connectivity to enhance the photographic experience.\n\nIn conclusion, Canon's commitment to excellence in photography is unwavering. Whether you're a professional photographer, an aspiring enthusiast, or someone who simply loves capturing life's moments, Canon's technology and innovation empower you to do so\n";
}
function compiledContent2() {
  return html2;
}
function getHeadings2() {
  return [{ "depth": 2, "slug": "1-cutting-edge-camera-technology", "text": "1. Cutting-Edge Camera Technology" }, { "depth": 2, "slug": "2-diverse-lens-ecosystem", "text": "2. Diverse Lens Ecosystem" }, { "depth": 2, "slug": "3-innovative-imaging-solutions", "text": "3. Innovative Imaging Solutions" }, { "depth": 2, "slug": "4-professional-grade-video-recording", "text": "4. Professional-Grade Video Recording" }, { "depth": 2, "slug": "5-commitment-to-sustainability", "text": "5. Commitment to Sustainability" }, { "depth": 2, "slug": "6-user-friendly-interface", "text": "6. User-Friendly Interface" }, { "depth": 2, "slug": "7-reliability-and-durability", "text": "7. Reliability and Durability" }, { "depth": 2, "slug": "8-photography-education", "text": "8. Photography Education" }, { "depth": 2, "slug": "9-community-and-inspiration", "text": "9. Community and Inspiration" }, { "depth": 2, "slug": "10-innovation-in-the-digital-era", "text": "10. Innovation in the Digital Era" }];
}
var html2, frontmatter2, file2, url2, Content2;
var init_cannon_excellence_CDLb_1ug = __esm({
  "dist/_worker.js/chunks/cannon-excellence_CDLb-1ug.mjs"() {
    "use strict";
    init_checked_fetch();
    init_modules_watch_stub();
    init_server_Den36nYv();
    globalThis.process ??= {};
    globalThis.process.env ??= {};
    html2 = '<p>For photographers and enthusiasts alike, Canon has been a symbol of excellence in the world of photography for decades. In 2024, Canon continues to lead the way in innovation, enabling us to capture life\u2019s most precious moments with unparalleled quality and precision. Let\u2019s explore the world of photography and how Canon\u2019s excellence plays a pivotal role.</p>\n<h2 id="1-cutting-edge-camera-technology"><strong>1. Cutting-Edge Camera Technology</strong></h2>\n<p>Canon is renowned for its cutting-edge camera technology. From DSLRs to mirrorless cameras, Canon consistently pushes the boundaries of what\u2019s possible in photography. High-resolution sensors, advanced autofocus systems, and remarkable image processing ensure that every shot is a masterpiece.</p>\n<h2 id="2-diverse-lens-ecosystem"><strong>2. Diverse Lens Ecosystem</strong></h2>\n<p>Canon boasts a diverse and extensive lens ecosystem that caters to photographers of all levels. Whether you\u2019re into portrait photography, wildlife, or landscape, Canon offers a lens for every occasion. The L-series lenses are a testament to Canon\u2019s commitment to optical excellence.</p>\n<h2 id="3-innovative-imaging-solutions"><strong>3. Innovative Imaging Solutions</strong></h2>\n<p>Canon\u2019s imaging solutions extend beyond cameras and lenses. Their printers, scanners, and image editing software empower photographers to bring their vision to life. Canon\u2019s color accuracy and print quality are unmatched in the industry.</p>\n<h2 id="4-professional-grade-video-recording"><strong>4. Professional-Grade Video Recording</strong></h2>\n<p>Canon cameras are not just for photography; they excel in videography too. From vlogging to cinematic filmmaking, Canon\u2019s video capabilities are a favorite among content creators. Dual Pixel Autofocus and high-quality 4K recording are staples of Canon\u2019s video prowess.</p>\n<h2 id="5-commitment-to-sustainability"><strong>5. Commitment to Sustainability</strong></h2>\n<p>Canon is committed to environmental sustainability. They implement eco-friendly practices in manufacturing and recycling programs. Choosing Canon means supporting a company that cares about the planet.</p>\n<h2 id="6-user-friendly-interface"><strong>6. User-Friendly Interface</strong></h2>\n<p>Canon\u2019s user-friendly interfaces make photography accessible to beginners and professionals alike. Intuitive menus, touchscreen controls, and customizable settings ensure a seamless shooting experience.</p>\n<h2 id="7-reliability-and-durability"><strong>7. Reliability and Durability</strong></h2>\n<p>Canon\u2019s cameras are built to last. They can withstand challenging environments and offer durability that professional photographers demand. Canon users know they can rely on their gear in any situation.</p>\n<h2 id="8-photography-education"><strong>8. Photography Education</strong></h2>\n<p>Canon supports photography education with workshops, tutorials, and online resources. They empower aspiring photographers to enhance their skills and make the most of Canon\u2019s equipment.</p>\n<h2 id="9-community-and-inspiration"><strong>9. Community and Inspiration</strong></h2>\n<p>Canon\u2019s photography community is vibrant and inspiring. Photographers share their work, tips, and experiences, creating a sense of camaraderie among enthusiasts and professionals.</p>\n<h2 id="10-innovation-in-the-digital-era"><strong>10. Innovation in the Digital Era</strong></h2>\n<p>In a rapidly evolving digital era, Canon consistently adapts and innovates. They embrace new technologies like AI and connectivity to enhance the photographic experience.</p>\n<p>In conclusion, Canon\u2019s commitment to excellence in photography is unwavering. Whether you\u2019re a professional photographer, an aspiring enthusiast, or someone who simply loves capturing life\u2019s moments, Canon\u2019s technology and innovation empower you to do so</p>';
    frontmatter2 = { "title": "Capturing Life's Moments with Canon Excellence", "pubDate": "2024-01-15T00:00:00.000Z", "author": "Bonnie Green", "authImage": "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/bonnie-green.png", "image": "image4.png", "slug": "capturing-lifes-moments-with-canon-excellence", "summary": "Canon has been a symbol of excellence in the world of photography for decades. In 2024, Canon continues to lead the way in innovation...", "type": "Article" };
    file2 = "/home/abdi/Projects/Addition/Addition-Plus-Website/src/content/blog/cannon-excellence.md";
    url2 = void 0;
    __name(rawContent2, "rawContent");
    __name(compiledContent2, "compiledContent");
    __name(getHeadings2, "getHeadings");
    Content2 = createComponent((result, _props, slots) => {
      const { layout, ...content } = frontmatter2;
      content.file = file2;
      content.url = url2;
      return renderTemplate`${maybeRenderHead()}${unescapeHTML(html2)}`;
    });
  }
});

// dist/_worker.js/chunks/cannon-excellence_tSsv6KYc.mjs
var cannon_excellence_tSsv6KYc_exports = {};
__export(cannon_excellence_tSsv6KYc_exports, {
  default: () => defaultMod2
});
async function getMod2() {
  return Promise.resolve().then(() => (init_cannon_excellence_CDLb_1ug(), cannon_excellence_CDLb_1ug_exports));
}
var collectedLinks2, collectedStyles2, collectedScripts2, defaultMod2;
var init_cannon_excellence_tSsv6KYc = __esm({
  "dist/_worker.js/chunks/cannon-excellence_tSsv6KYc.mjs"() {
    "use strict";
    init_checked_fetch();
    init_modules_watch_stub();
    globalThis.process ??= {};
    globalThis.process.env ??= {};
    __name(getMod2, "getMod");
    collectedLinks2 = [];
    collectedStyles2 = [];
    collectedScripts2 = [];
    defaultMod2 = { __astroPropagation: true, getMod: getMod2, collectedLinks: collectedLinks2, collectedStyles: collectedStyles2, collectedScripts: collectedScripts2 };
  }
});

// dist/_worker.js/chunks/cutting-edge-tablets_B_0rVKQw.mjs
var cutting_edge_tablets_B_0rVKQw_exports = {};
__export(cutting_edge_tablets_B_0rVKQw_exports, {
  Content: () => Content3,
  compiledContent: () => compiledContent3,
  default: () => Content3,
  file: () => file3,
  frontmatter: () => frontmatter3,
  getHeadings: () => getHeadings3,
  rawContent: () => rawContent3,
  url: () => url3
});
function rawContent3() {
  return "\nIn the world of digital creativity, tablets have become indispensable tools for artists, designers, and anyone seeking to unleash their artistic potential. In 2024, the market is brimming with cutting-edge tablets that offer new dimensions of creativity. Let's dive into the exciting realm of tablet technology and discover the tools that can help you bring your artistic visions to life.\n\n## **1. Remarkable Displays**\n\nCutting-edge tablets feature remarkable displays with high resolutions, wide color gamuts, and exceptional brightness. Whether you're illustrating, editing photos, or 3D modeling, these displays provide true-to-life visuals and precise color accuracy.\n\n## **2. Powerful Processing Power**\n\nThe heart of a cutting-edge tablet is its processing power. With advanced processors and ample RAM, these tablets can handle resource-intensive tasks like rendering, video editing, and complex digital painting with ease.\n\n## **3. Innovative Stylus Technology**\n\nStylus technology has evolved significantly. Cutting-edge tablets come with styluses that offer precise control, pressure sensitivity, and low latency. They mimic the feel of traditional drawing and provide an intuitive creative experience.\n\n## **4. Versatile Software Compatibility**\n\nThese tablets are compatible with a wide range of creative software, from industry-standard programs like Adobe Creative Cloud to specialized apps for digital art, animation, and 3D modeling. You have the flexibility to choose the tools that suit your creative needs.\n\n## **5. 3D Modeling and Sculpting**\n\nFor those in the 3D modeling and sculpting realm, cutting-edge tablets support powerful applications that allow you to sculpt, texture, and animate your creations in a tactile and immersive way.\n\n## **6. Digital Painting and Illustration**\n\nArtists can explore a vast canvas of possibilities with digital painting and illustration. Cutting-edge tablets offer natural brush strokes, layers, and a variety of brushes to achieve stunning artistic results.\n\n## **7. Photo and Video Editing**\n\nPhotographers and videographers benefit from advanced tablets for on-the-go editing. High-resolution screens and touch-based controls make editing a breeze, whether you're enhancing photos or cutting video footage.\n\n## **8. Portability and Connectivity**\n\nCutting-edge tablets are designed for portability, making them ideal for creatives on the move. They offer a range of connectivity options, including USB-C, Bluetooth, and Wi-Fi, to streamline your workflow.\n\n## **9. Augmented Reality (AR)**\n\nSome cutting-edge tablets integrate augmented reality features, allowing artists to overlay digital creations onto the physical world, opening up new possibilities for interactive and immersive experiences.\n\n## **10. Cloud Integration**\n\nCloud integration ensures that your work is accessible from anywhere. You can sync your projects across devices and collaborate with others seamlessly.\n\nIn conclusion, if you're looking to unleash your creativity and take your digital artistry to new heights, cutting-edge tablets are your canvas. Their remarkable displays, powerful processing, and innovative stylus technology provide the tools you need to bring your creative visions to life. As we embark on the creative journey of 2024, explore the world of cutting-edge tablets and let your imagination soar.\n";
}
function compiledContent3() {
  return html3;
}
function getHeadings3() {
  return [{ "depth": 2, "slug": "1-remarkable-displays", "text": "1. Remarkable Displays" }, { "depth": 2, "slug": "2-powerful-processing-power", "text": "2. Powerful Processing Power" }, { "depth": 2, "slug": "3-innovative-stylus-technology", "text": "3. Innovative Stylus Technology" }, { "depth": 2, "slug": "4-versatile-software-compatibility", "text": "4. Versatile Software Compatibility" }, { "depth": 2, "slug": "5-3d-modeling-and-sculpting", "text": "5. 3D Modeling and Sculpting" }, { "depth": 2, "slug": "6-digital-painting-and-illustration", "text": "6. Digital Painting and Illustration" }, { "depth": 2, "slug": "7-photo-and-video-editing", "text": "7. Photo and Video Editing" }, { "depth": 2, "slug": "8-portability-and-connectivity", "text": "8. Portability and Connectivity" }, { "depth": 2, "slug": "9-augmented-reality-ar", "text": "9. Augmented Reality (AR)" }, { "depth": 2, "slug": "10-cloud-integration", "text": "10. Cloud Integration" }];
}
var html3, frontmatter3, file3, url3, Content3;
var init_cutting_edge_tablets_B_0rVKQw = __esm({
  "dist/_worker.js/chunks/cutting-edge-tablets_B_0rVKQw.mjs"() {
    "use strict";
    init_checked_fetch();
    init_modules_watch_stub();
    init_server_Den36nYv();
    globalThis.process ??= {};
    globalThis.process.env ??= {};
    html3 = '<p>In the world of digital creativity, tablets have become indispensable tools for artists, designers, and anyone seeking to unleash their artistic potential. In 2024, the market is brimming with cutting-edge tablets that offer new dimensions of creativity. Let\u2019s dive into the exciting realm of tablet technology and discover the tools that can help you bring your artistic visions to life.</p>\n<h2 id="1-remarkable-displays"><strong>1. Remarkable Displays</strong></h2>\n<p>Cutting-edge tablets feature remarkable displays with high resolutions, wide color gamuts, and exceptional brightness. Whether you\u2019re illustrating, editing photos, or 3D modeling, these displays provide true-to-life visuals and precise color accuracy.</p>\n<h2 id="2-powerful-processing-power"><strong>2. Powerful Processing Power</strong></h2>\n<p>The heart of a cutting-edge tablet is its processing power. With advanced processors and ample RAM, these tablets can handle resource-intensive tasks like rendering, video editing, and complex digital painting with ease.</p>\n<h2 id="3-innovative-stylus-technology"><strong>3. Innovative Stylus Technology</strong></h2>\n<p>Stylus technology has evolved significantly. Cutting-edge tablets come with styluses that offer precise control, pressure sensitivity, and low latency. They mimic the feel of traditional drawing and provide an intuitive creative experience.</p>\n<h2 id="4-versatile-software-compatibility"><strong>4. Versatile Software Compatibility</strong></h2>\n<p>These tablets are compatible with a wide range of creative software, from industry-standard programs like Adobe Creative Cloud to specialized apps for digital art, animation, and 3D modeling. You have the flexibility to choose the tools that suit your creative needs.</p>\n<h2 id="5-3d-modeling-and-sculpting"><strong>5. 3D Modeling and Sculpting</strong></h2>\n<p>For those in the 3D modeling and sculpting realm, cutting-edge tablets support powerful applications that allow you to sculpt, texture, and animate your creations in a tactile and immersive way.</p>\n<h2 id="6-digital-painting-and-illustration"><strong>6. Digital Painting and Illustration</strong></h2>\n<p>Artists can explore a vast canvas of possibilities with digital painting and illustration. Cutting-edge tablets offer natural brush strokes, layers, and a variety of brushes to achieve stunning artistic results.</p>\n<h2 id="7-photo-and-video-editing"><strong>7. Photo and Video Editing</strong></h2>\n<p>Photographers and videographers benefit from advanced tablets for on-the-go editing. High-resolution screens and touch-based controls make editing a breeze, whether you\u2019re enhancing photos or cutting video footage.</p>\n<h2 id="8-portability-and-connectivity"><strong>8. Portability and Connectivity</strong></h2>\n<p>Cutting-edge tablets are designed for portability, making them ideal for creatives on the move. They offer a range of connectivity options, including USB-C, Bluetooth, and Wi-Fi, to streamline your workflow.</p>\n<h2 id="9-augmented-reality-ar"><strong>9. Augmented Reality (AR)</strong></h2>\n<p>Some cutting-edge tablets integrate augmented reality features, allowing artists to overlay digital creations onto the physical world, opening up new possibilities for interactive and immersive experiences.</p>\n<h2 id="10-cloud-integration"><strong>10. Cloud Integration</strong></h2>\n<p>Cloud integration ensures that your work is accessible from anywhere. You can sync your projects across devices and collaborate with others seamlessly.</p>\n<p>In conclusion, if you\u2019re looking to unleash your creativity and take your digital artistry to new heights, cutting-edge tablets are your canvas. Their remarkable displays, powerful processing, and innovative stylus technology provide the tools you need to bring your creative visions to life. As we embark on the creative journey of 2024, explore the world of cutting-edge tablets and let your imagination soar.</p>';
    frontmatter3 = { "title": "Unleash Creativity With These Cutting-Edge Tablets", "pubDate": "2024-01-14T00:00:00.000Z", "author": "Bonnie Green", "authImage": "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/bonnie-green.png", "image": "image5.png", "slug": "unleash-creativity-with-these-cutting-edge-tablets", "summary": "In the world of digital creativity, tablets have become indispensable tools for artists, designers, and anyone seeking to unleash their artistic potential.", "type": "Article" };
    file3 = "/home/abdi/Projects/Addition/Addition-Plus-Website/src/content/blog/cutting-edge-tablets.md";
    url3 = void 0;
    __name(rawContent3, "rawContent");
    __name(compiledContent3, "compiledContent");
    __name(getHeadings3, "getHeadings");
    Content3 = createComponent((result, _props, slots) => {
      const { layout, ...content } = frontmatter3;
      content.file = file3;
      content.url = url3;
      return renderTemplate`${maybeRenderHead()}${unescapeHTML(html3)}`;
    });
  }
});

// dist/_worker.js/chunks/cutting-edge-tablets_BY8xOBbU.mjs
var cutting_edge_tablets_BY8xOBbU_exports = {};
__export(cutting_edge_tablets_BY8xOBbU_exports, {
  default: () => defaultMod3
});
async function getMod3() {
  return Promise.resolve().then(() => (init_cutting_edge_tablets_B_0rVKQw(), cutting_edge_tablets_B_0rVKQw_exports));
}
var collectedLinks3, collectedStyles3, collectedScripts3, defaultMod3;
var init_cutting_edge_tablets_BY8xOBbU = __esm({
  "dist/_worker.js/chunks/cutting-edge-tablets_BY8xOBbU.mjs"() {
    "use strict";
    init_checked_fetch();
    init_modules_watch_stub();
    globalThis.process ??= {};
    globalThis.process.env ??= {};
    __name(getMod3, "getMod");
    collectedLinks3 = [];
    collectedStyles3 = [];
    collectedScripts3 = [];
    defaultMod3 = { __astroPropagation: true, getMod: getMod3, collectedLinks: collectedLinks3, collectedStyles: collectedStyles3, collectedScripts: collectedScripts3 };
  }
});

// dist/_worker.js/chunks/elevate-your-mobile-experience_DZzPS4i2.mjs
var elevate_your_mobile_experience_DZzPS4i2_exports = {};
__export(elevate_your_mobile_experience_DZzPS4i2_exports, {
  Content: () => Content4,
  compiledContent: () => compiledContent4,
  default: () => Content4,
  file: () => file4,
  frontmatter: () => frontmatter4,
  getHeadings: () => getHeadings4,
  rawContent: () => rawContent4,
  url: () => url4
});
function rawContent4() {
  return "\nIn the ever-evolving world of mobile technology, Samsung has consistently delivered cutting-edge devices that redefine the way we experience the digital world. If you're looking to elevate your mobile experience in 2024, here's why Samsung should be at the top of your list.\n\n## **1. Innovative Display Technology**\n\nSamsung's mobile devices are renowned for their stunning displays. With advancements in AMOLED and Dynamic AMOLED technology, Samsung offers vibrant colors, deep blacks, and sharp resolutions. Whether you're streaming videos, playing games, or working on productivity apps, the visual experience is unparalleled.\n\n## **2. Powerful Performance**\n\nSamsung equips its smartphones with powerful processors and ample RAM, ensuring smooth multitasking and efficient performance. Whether you're a mobile gamer, content creator, or business professional, Samsung devices can handle your tasks with ease.\n\n## **3. Impressive Camera Systems**\n\nCapture life's moments in stunning detail with Samsung's camera systems. From high-resolution main cameras to ultra-wide and telephoto lenses, Samsung devices provide versatile photography options. Features like AI enhancements and night mode deliver exceptional results in various lighting conditions.\n\n## **4. 5G Connectivity**\n\nStay at the forefront of connectivity with 5G-enabled Samsung devices. Enjoy lightning-fast download and upload speeds, low latency, and seamless streaming. Whether you're working remotely or enjoying online entertainment, 5G ensures a lag-free experience.\n\n## **5. Long-lasting Battery Life**\n\nSamsung understands the importance of battery life. Their devices come equipped with large batteries that can last all day. With optimizations for power efficiency and fast charging capabilities, you can stay connected without interruptions.\n\n## **6. Secure and User-Friendly**\n\nSamsung prioritizes security with features like Samsung Knox, ensuring your data is protected. Additionally, their user-friendly interface, One UI, offers a smooth and intuitive user experience.\n\n## **7. Ecosystem Integration**\n\nIf you're already part of the Samsung ecosystem, their devices seamlessly integrate with each other. Share content across devices, sync your data, and enjoy a cohesive digital experience.\n\n## **8. Ongoing Software Support**\n\nSamsung provides regular software updates and security patches to keep your device running smoothly and protected from potential vulnerabilities.\n\n## **9. Eco-Friendly Initiatives**\n\nSamsung is committed to sustainability. They strive to reduce their environmental footprint by using eco-friendly materials and implementing recycling programs.\n\n## **10. Wide Range of Options**\n\nSamsung offers a wide range of devices to cater to various needs and budgets. Whether you prefer flagship models or more budget-friendly options, there's a Samsung device for you.\n\nIn conclusion, if you're looking to elevate your mobile experience in 2024, Samsung should be your go-to choice. Their commitment to innovation, performance, and user satisfaction makes them a leader in the mobile technology industry. Explore the Samsung ecosystem and discover how it can enhance your digital lifestyle.\n";
}
function compiledContent4() {
  return html4;
}
function getHeadings4() {
  return [{ "depth": 2, "slug": "1-innovative-display-technology", "text": "1. Innovative Display Technology" }, { "depth": 2, "slug": "2-powerful-performance", "text": "2. Powerful Performance" }, { "depth": 2, "slug": "3-impressive-camera-systems", "text": "3. Impressive Camera Systems" }, { "depth": 2, "slug": "4-5g-connectivity", "text": "4. 5G Connectivity" }, { "depth": 2, "slug": "5-long-lasting-battery-life", "text": "5. Long-lasting Battery Life" }, { "depth": 2, "slug": "6-secure-and-user-friendly", "text": "6. Secure and User-Friendly" }, { "depth": 2, "slug": "7-ecosystem-integration", "text": "7. Ecosystem Integration" }, { "depth": 2, "slug": "8-ongoing-software-support", "text": "8. Ongoing Software Support" }, { "depth": 2, "slug": "9-eco-friendly-initiatives", "text": "9. Eco-Friendly Initiatives" }, { "depth": 2, "slug": "10-wide-range-of-options", "text": "10. Wide Range of Options" }];
}
var html4, frontmatter4, file4, url4, Content4;
var init_elevate_your_mobile_experience_DZzPS4i2 = __esm({
  "dist/_worker.js/chunks/elevate-your-mobile-experience_DZzPS4i2.mjs"() {
    "use strict";
    init_checked_fetch();
    init_modules_watch_stub();
    init_server_Den36nYv();
    globalThis.process ??= {};
    globalThis.process.env ??= {};
    html4 = '<p>In the ever-evolving world of mobile technology, Samsung has consistently delivered cutting-edge devices that redefine the way we experience the digital world. If you\u2019re looking to elevate your mobile experience in 2024, here\u2019s why Samsung should be at the top of your list.</p>\n<h2 id="1-innovative-display-technology"><strong>1. Innovative Display Technology</strong></h2>\n<p>Samsung\u2019s mobile devices are renowned for their stunning displays. With advancements in AMOLED and Dynamic AMOLED technology, Samsung offers vibrant colors, deep blacks, and sharp resolutions. Whether you\u2019re streaming videos, playing games, or working on productivity apps, the visual experience is unparalleled.</p>\n<h2 id="2-powerful-performance"><strong>2. Powerful Performance</strong></h2>\n<p>Samsung equips its smartphones with powerful processors and ample RAM, ensuring smooth multitasking and efficient performance. Whether you\u2019re a mobile gamer, content creator, or business professional, Samsung devices can handle your tasks with ease.</p>\n<h2 id="3-impressive-camera-systems"><strong>3. Impressive Camera Systems</strong></h2>\n<p>Capture life\u2019s moments in stunning detail with Samsung\u2019s camera systems. From high-resolution main cameras to ultra-wide and telephoto lenses, Samsung devices provide versatile photography options. Features like AI enhancements and night mode deliver exceptional results in various lighting conditions.</p>\n<h2 id="4-5g-connectivity"><strong>4. 5G Connectivity</strong></h2>\n<p>Stay at the forefront of connectivity with 5G-enabled Samsung devices. Enjoy lightning-fast download and upload speeds, low latency, and seamless streaming. Whether you\u2019re working remotely or enjoying online entertainment, 5G ensures a lag-free experience.</p>\n<h2 id="5-long-lasting-battery-life"><strong>5. Long-lasting Battery Life</strong></h2>\n<p>Samsung understands the importance of battery life. Their devices come equipped with large batteries that can last all day. With optimizations for power efficiency and fast charging capabilities, you can stay connected without interruptions.</p>\n<h2 id="6-secure-and-user-friendly"><strong>6. Secure and User-Friendly</strong></h2>\n<p>Samsung prioritizes security with features like Samsung Knox, ensuring your data is protected. Additionally, their user-friendly interface, One UI, offers a smooth and intuitive user experience.</p>\n<h2 id="7-ecosystem-integration"><strong>7. Ecosystem Integration</strong></h2>\n<p>If you\u2019re already part of the Samsung ecosystem, their devices seamlessly integrate with each other. Share content across devices, sync your data, and enjoy a cohesive digital experience.</p>\n<h2 id="8-ongoing-software-support"><strong>8. Ongoing Software Support</strong></h2>\n<p>Samsung provides regular software updates and security patches to keep your device running smoothly and protected from potential vulnerabilities.</p>\n<h2 id="9-eco-friendly-initiatives"><strong>9. Eco-Friendly Initiatives</strong></h2>\n<p>Samsung is committed to sustainability. They strive to reduce their environmental footprint by using eco-friendly materials and implementing recycling programs.</p>\n<h2 id="10-wide-range-of-options"><strong>10. Wide Range of Options</strong></h2>\n<p>Samsung offers a wide range of devices to cater to various needs and budgets. Whether you prefer flagship models or more budget-friendly options, there\u2019s a Samsung device for you.</p>\n<p>In conclusion, if you\u2019re looking to elevate your mobile experience in 2024, Samsung should be your go-to choice. Their commitment to innovation, performance, and user satisfaction makes them a leader in the mobile technology industry. Explore the Samsung ecosystem and discover how it can enhance your digital lifestyle.</p>';
    frontmatter4 = { "title": "Our first project with Astro", "pubDate": "2024-01-17T00:00:00.000Z", "author": "Bonnie Green", "authImage": "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/bonnie-green.png", "image": "image3.png", "slug": "elevate-your-mobile-experience-with-samsung", "summary": "In the ever-evolving world of mobile technology, Samsung has consistently delivered cutting-edge devices that redefine the way we experience the digital world.", "type": "Article" };
    file4 = "/home/abdi/Projects/Addition/Addition-Plus-Website/src/content/blog/elevate-your-mobile-experience.md";
    url4 = void 0;
    __name(rawContent4, "rawContent");
    __name(compiledContent4, "compiledContent");
    __name(getHeadings4, "getHeadings");
    Content4 = createComponent((result, _props, slots) => {
      const { layout, ...content } = frontmatter4;
      content.file = file4;
      content.url = url4;
      return renderTemplate`${maybeRenderHead()}${unescapeHTML(html4)}`;
    });
  }
});

// dist/_worker.js/chunks/elevate-your-mobile-experience_BP2ZP5B2.mjs
var elevate_your_mobile_experience_BP2ZP5B2_exports = {};
__export(elevate_your_mobile_experience_BP2ZP5B2_exports, {
  default: () => defaultMod4
});
async function getMod4() {
  return Promise.resolve().then(() => (init_elevate_your_mobile_experience_DZzPS4i2(), elevate_your_mobile_experience_DZzPS4i2_exports));
}
var collectedLinks4, collectedStyles4, collectedScripts4, defaultMod4;
var init_elevate_your_mobile_experience_BP2ZP5B2 = __esm({
  "dist/_worker.js/chunks/elevate-your-mobile-experience_BP2ZP5B2.mjs"() {
    "use strict";
    init_checked_fetch();
    init_modules_watch_stub();
    globalThis.process ??= {};
    globalThis.process.env ??= {};
    __name(getMod4, "getMod");
    collectedLinks4 = [];
    collectedStyles4 = [];
    collectedScripts4 = [];
    defaultMod4 = { __astroPropagation: true, getMod: getMod4, collectedLinks: collectedLinks4, collectedStyles: collectedStyles4, collectedScripts: collectedScripts4 };
  }
});

// dist/_worker.js/chunks/guardian-of-the-digital-realm_B83E_zBB.mjs
var guardian_of_the_digital_realm_B83E_zBB_exports = {};
__export(guardian_of_the_digital_realm_B83E_zBB_exports, {
  Content: () => Content5,
  compiledContent: () => compiledContent5,
  default: () => Content5,
  file: () => file5,
  frontmatter: () => frontmatter5,
  getHeadings: () => getHeadings5,
  rawContent: () => rawContent5,
  url: () => url5
});
function rawContent5() {
  return "\nIn today's interconnected world, where data breaches and cyber threats are on the rise, web security has become paramount. As the guardians of the digital realm, it's our responsibility to protect sensitive information, maintain user trust, and ensure the integrity of online systems. Let's dive into the world of web security and explore the key principles that every developer should embrace.\n\n## **1. Authentication and Authorization**\n\n**Authentication** is the process of verifying the identity of users or systems accessing your web applications. Implement strong authentication mechanisms, such as multi-factor authentication (MFA), to prevent unauthorized access.\n\n**Authorization**, on the other hand, determines what actions authenticated users are allowed to perform. Employ role-based access control (RBAC) and least privilege principles to ensure users have only the necessary permissions.\n\n## **2. Data Encryption**\n\nEncrypt sensitive data both at rest and in transit. Use protocols like HTTPS to secure data during transmission and employ strong encryption algorithms to protect data stored on servers. Regularly update encryption methods to stay ahead of emerging threats.\n\n## **3. Input Validation and Sanitization**\n\nAlways validate and sanitize user inputs to prevent SQL injection, cross-site scripting (XSS), and other injection attacks. Implement server-side validation and use libraries that offer protection against common vulnerabilities.\n\n## **4. Patch Management**\n\nStay vigilant about software and framework updates. Vulnerabilities often arise from outdated components. Establish a patch management process to apply security patches promptly and regularly.\n\n## **5. Security Headers**\n\nUtilize security headers in your web applications to mitigate common web attacks. Headers like Content Security Policy (CSP), X-Content-Type-Options, and X-Frame-Options can add an extra layer of protection against cross-site scripting and clickjacking attacks.\n\n## **6. Web Application Firewall (WAF)**\n\nConsider implementing a Web Application Firewall (WAF) to filter and monitor incoming traffic. A WAF can help identify and block malicious requests before they reach your application.\n\n## **7. Security Testing**\n\nRegularly conduct security assessments, including penetration testing and code reviews, to identify and address vulnerabilities. Automated scanning tools can also help discover potential issues.\n\n## **8. Logging and Monitoring**\n\nMaintain comprehensive logs of application activities and set up real-time monitoring. Monitoring allows you to detect and respond to security incidents promptly.\n\n## **9. User Education**\n\nEducate your users about best security practices, such as creating strong passwords, recognizing phishing attempts, and staying vigilant online. Informed users are your allies in the battle against cyber threats.\n\n## **10. Incident Response Plan**\n\nPrepare for the worst-case scenario with a well-defined incident response plan. This plan should outline the steps to take when a security breach occurs, minimizing damage and downtime.\n\nAs developers and stewards of the digital realm, our commitment to web security is not optional; it's a necessity. By following these principles and staying informed about emerging threats, we can safeguard the digital world and protect the trust of users and organizations alike. Let's remain vigilant in our role as guardians of web security.\n";
}
function compiledContent5() {
  return html5;
}
function getHeadings5() {
  return [{ "depth": 2, "slug": "1-authentication-and-authorization", "text": "1. Authentication and Authorization" }, { "depth": 2, "slug": "2-data-encryption", "text": "2. Data Encryption" }, { "depth": 2, "slug": "3-input-validation-and-sanitization", "text": "3. Input Validation and Sanitization" }, { "depth": 2, "slug": "4-patch-management", "text": "4. Patch Management" }, { "depth": 2, "slug": "5-security-headers", "text": "5. Security Headers" }, { "depth": 2, "slug": "6-web-application-firewall-waf", "text": "6. Web Application Firewall (WAF)" }, { "depth": 2, "slug": "7-security-testing", "text": "7. Security Testing" }, { "depth": 2, "slug": "8-logging-and-monitoring", "text": "8. Logging and Monitoring" }, { "depth": 2, "slug": "9-user-education", "text": "9. User Education" }, { "depth": 2, "slug": "10-incident-response-plan", "text": "10. Incident Response Plan" }];
}
var html5, frontmatter5, file5, url5, Content5;
var init_guardian_of_the_digital_realm_B83E_zBB = __esm({
  "dist/_worker.js/chunks/guardian-of-the-digital-realm_B83E_zBB.mjs"() {
    "use strict";
    init_checked_fetch();
    init_modules_watch_stub();
    init_server_Den36nYv();
    globalThis.process ??= {};
    globalThis.process.env ??= {};
    html5 = '<p>In today\u2019s interconnected world, where data breaches and cyber threats are on the rise, web security has become paramount. As the guardians of the digital realm, it\u2019s our responsibility to protect sensitive information, maintain user trust, and ensure the integrity of online systems. Let\u2019s dive into the world of web security and explore the key principles that every developer should embrace.</p>\n<h2 id="1-authentication-and-authorization"><strong>1. Authentication and Authorization</strong></h2>\n<p><strong>Authentication</strong> is the process of verifying the identity of users or systems accessing your web applications. Implement strong authentication mechanisms, such as multi-factor authentication (MFA), to prevent unauthorized access.</p>\n<p><strong>Authorization</strong>, on the other hand, determines what actions authenticated users are allowed to perform. Employ role-based access control (RBAC) and least privilege principles to ensure users have only the necessary permissions.</p>\n<h2 id="2-data-encryption"><strong>2. Data Encryption</strong></h2>\n<p>Encrypt sensitive data both at rest and in transit. Use protocols like HTTPS to secure data during transmission and employ strong encryption algorithms to protect data stored on servers. Regularly update encryption methods to stay ahead of emerging threats.</p>\n<h2 id="3-input-validation-and-sanitization"><strong>3. Input Validation and Sanitization</strong></h2>\n<p>Always validate and sanitize user inputs to prevent SQL injection, cross-site scripting (XSS), and other injection attacks. Implement server-side validation and use libraries that offer protection against common vulnerabilities.</p>\n<h2 id="4-patch-management"><strong>4. Patch Management</strong></h2>\n<p>Stay vigilant about software and framework updates. Vulnerabilities often arise from outdated components. Establish a patch management process to apply security patches promptly and regularly.</p>\n<h2 id="5-security-headers"><strong>5. Security Headers</strong></h2>\n<p>Utilize security headers in your web applications to mitigate common web attacks. Headers like Content Security Policy (CSP), X-Content-Type-Options, and X-Frame-Options can add an extra layer of protection against cross-site scripting and clickjacking attacks.</p>\n<h2 id="6-web-application-firewall-waf"><strong>6. Web Application Firewall (WAF)</strong></h2>\n<p>Consider implementing a Web Application Firewall (WAF) to filter and monitor incoming traffic. A WAF can help identify and block malicious requests before they reach your application.</p>\n<h2 id="7-security-testing"><strong>7. Security Testing</strong></h2>\n<p>Regularly conduct security assessments, including penetration testing and code reviews, to identify and address vulnerabilities. Automated scanning tools can also help discover potential issues.</p>\n<h2 id="8-logging-and-monitoring"><strong>8. Logging and Monitoring</strong></h2>\n<p>Maintain comprehensive logs of application activities and set up real-time monitoring. Monitoring allows you to detect and respond to security incidents promptly.</p>\n<h2 id="9-user-education"><strong>9. User Education</strong></h2>\n<p>Educate your users about best security practices, such as creating strong passwords, recognizing phishing attempts, and staying vigilant online. Informed users are your allies in the battle against cyber threats.</p>\n<h2 id="10-incident-response-plan"><strong>10. Incident Response Plan</strong></h2>\n<p>Prepare for the worst-case scenario with a well-defined incident response plan. This plan should outline the steps to take when a security breach occurs, minimizing damage and downtime.</p>\n<p>As developers and stewards of the digital realm, our commitment to web security is not optional; it\u2019s a necessity. By following these principles and staying informed about emerging threats, we can safeguard the digital world and protect the trust of users and organizations alike. Let\u2019s remain vigilant in our role as guardians of web security.</p>';
    frontmatter5 = { "title": "Guardian of the Digital Realm: Web Security", "pubDate": "2024-01-14T00:00:00.000Z", "author": "Jese Leos", "authImage": "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png", "image": "image2.png", "slug": "guardian-of-the-digital-realm-web-security", "summary": "In today's interconnected world, where data breaches and cyber threats are on the rise, web security has become paramount. As the guardians of the digital realm...", "type": "Tutorial" };
    file5 = "/home/abdi/Projects/Addition/Addition-Plus-Website/src/content/blog/guardian-of-the-digital-realm.md";
    url5 = void 0;
    __name(rawContent5, "rawContent");
    __name(compiledContent5, "compiledContent");
    __name(getHeadings5, "getHeadings");
    Content5 = createComponent((result, _props, slots) => {
      const { layout, ...content } = frontmatter5;
      content.file = file5;
      content.url = url5;
      return renderTemplate`${maybeRenderHead()}${unescapeHTML(html5)}`;
    });
  }
});

// dist/_worker.js/chunks/guardian-of-the-digital-realm__F-pfaew.mjs
var guardian_of_the_digital_realm_F_pfaew_exports = {};
__export(guardian_of_the_digital_realm_F_pfaew_exports, {
  default: () => defaultMod5
});
async function getMod5() {
  return Promise.resolve().then(() => (init_guardian_of_the_digital_realm_B83E_zBB(), guardian_of_the_digital_realm_B83E_zBB_exports));
}
var collectedLinks5, collectedStyles5, collectedScripts5, defaultMod5;
var init_guardian_of_the_digital_realm_F_pfaew = __esm({
  "dist/_worker.js/chunks/guardian-of-the-digital-realm__F-pfaew.mjs"() {
    "use strict";
    init_checked_fetch();
    init_modules_watch_stub();
    globalThis.process ??= {};
    globalThis.process.env ??= {};
    __name(getMod5, "getMod");
    collectedLinks5 = [];
    collectedStyles5 = [];
    collectedScripts5 = [];
    defaultMod5 = { __astroPropagation: true, getMod: getMod5, collectedLinks: collectedLinks5, collectedStyles: collectedStyles5, collectedScripts: collectedScripts5 };
  }
});

// dist/_worker.js/chunks/_astro_content_DMpHUyuA.mjs
function d(e2) {
  const t2 = h(e2), o2 = f(e2);
  for (let n2 = 0; n2 < o2.length; n2++)
    a.call(e2, o2[n2]) && t2.push(o2[n2]);
  return t2;
}
function b(e2, t2) {
  return !u(e2, t2)?.writable;
}
function y(e2, u2) {
  if ("object" == typeof e2 && null !== e2) {
    let a2;
    if (c(e2))
      a2 = [];
    else if (o(e2))
      a2 = new Date(e2.getTime ? e2.getTime() : e2);
    else if (n(e2))
      a2 = new RegExp(e2);
    else if (r2(e2))
      a2 = { message: e2.message };
    else if (s(e2) || l(e2) || i(e2))
      a2 = Object(e2);
    else {
      if (t(e2))
        return e2.slice();
      a2 = Object.create(Object.getPrototypeOf(e2));
    }
    const f2 = u2.includeSymbols ? d : h;
    for (const t2 of f2(e2))
      a2[t2] = e2[t2];
    return a2;
  }
  return e2;
}
function m(e2, t2, o2 = g) {
  const n2 = [], r3 = [];
  let s2 = true;
  const l2 = o2.includeSymbols ? d : h, i2 = !!o2.immutable;
  return (/* @__PURE__ */ __name(function e3(u2) {
    const a2 = i2 ? y(u2, o2) : u2, f2 = {};
    let h2 = true;
    const d2 = { node: a2, node_: u2, path: [].concat(n2), parent: r3[r3.length - 1], parents: r3, key: n2[n2.length - 1], isRoot: 0 === n2.length, level: n2.length, circular: void 0, isLeaf: false, notLeaf: true, notRoot: true, isFirst: false, isLast: false, update: function(e4, t3 = false) {
      d2.isRoot || (d2.parent.node[d2.key] = e4), d2.node = e4, t3 && (h2 = false);
    }, delete: function(e4) {
      delete d2.parent.node[d2.key], e4 && (h2 = false);
    }, remove: function(e4) {
      c(d2.parent.node) ? d2.parent.node.splice(d2.key, 1) : delete d2.parent.node[d2.key], e4 && (h2 = false);
    }, keys: null, before: function(e4) {
      f2.before = e4;
    }, after: function(e4) {
      f2.after = e4;
    }, pre: function(e4) {
      f2.pre = e4;
    }, post: function(e4) {
      f2.post = e4;
    }, stop: function() {
      s2 = false;
    }, block: function() {
      h2 = false;
    } };
    if (!s2)
      return d2;
    function g2() {
      if ("object" == typeof d2.node && null !== d2.node) {
        d2.keys && d2.node_ === d2.node || (d2.keys = l2(d2.node)), d2.isLeaf = 0 === d2.keys.length;
        for (let e4 = 0; e4 < r3.length; e4++)
          if (r3[e4].node_ === u2) {
            d2.circular = r3[e4];
            break;
          }
      } else
        d2.isLeaf = true, d2.keys = null;
      d2.notLeaf = !d2.isLeaf, d2.notRoot = !d2.isRoot;
    }
    __name(g2, "g");
    g2();
    const m2 = t2(d2, d2.node);
    if (void 0 !== m2 && d2.update && d2.update(m2), f2.before && f2.before(d2, d2.node), !h2)
      return d2;
    if ("object" == typeof d2.node && null !== d2.node && !d2.circular) {
      r3.push(d2), g2();
      for (const [t3, o3] of Object.entries(d2.keys ?? [])) {
        n2.push(o3), f2.pre && f2.pre(d2, d2.node[o3], o3);
        const r4 = e3(d2.node[o3]);
        i2 && p.call(d2.node, o3) && !b(d2.node, o3) && (d2.node[o3] = r4.node), r4.isLast = !!d2.keys?.length && +t3 == d2.keys.length - 1, r4.isFirst = 0 == +t3, f2.post && f2.post(d2, r4), n2.pop();
      }
      r3.pop();
    }
    return f2.after && f2.after(d2, d2.node), d2;
  }, "e"))(e2).node;
}
function pLimit(concurrency) {
  validateConcurrency(concurrency);
  const queue = new Queue();
  let activeCount = 0;
  const resumeNext = /* @__PURE__ */ __name(() => {
    if (activeCount < concurrency && queue.size > 0) {
      queue.dequeue()();
      activeCount++;
    }
  }, "resumeNext");
  const next = /* @__PURE__ */ __name(() => {
    activeCount--;
    resumeNext();
  }, "next");
  const run = /* @__PURE__ */ __name(async (function_, resolve, arguments_) => {
    const result = (async () => function_(...arguments_))();
    resolve(result);
    try {
      await result;
    } catch {
    }
    next();
  }, "run");
  const enqueue = /* @__PURE__ */ __name((function_, resolve, arguments_) => {
    new Promise((internalResolve) => {
      queue.enqueue(internalResolve);
    }).then(
      run.bind(void 0, function_, resolve, arguments_)
    );
    (async () => {
      await Promise.resolve();
      if (activeCount < concurrency) {
        resumeNext();
      }
    })();
  }, "enqueue");
  const generator = /* @__PURE__ */ __name((function_, ...arguments_) => new Promise((resolve) => {
    enqueue(function_, resolve, arguments_);
  }), "generator");
  Object.defineProperties(generator, {
    activeCount: {
      get: () => activeCount
    },
    pendingCount: {
      get: () => queue.size
    },
    clearQueue: {
      value() {
        queue.clear();
      }
    },
    concurrency: {
      get: () => concurrency,
      set(newConcurrency) {
        validateConcurrency(newConcurrency);
        concurrency = newConcurrency;
        queueMicrotask(() => {
          while (activeCount < concurrency && queue.size > 0) {
            resumeNext();
          }
        });
      }
    }
  });
  return generator;
}
function validateConcurrency(concurrency) {
  if (!((Number.isInteger(concurrency) || concurrency === Number.POSITIVE_INFINITY) && concurrency > 0)) {
    throw new TypeError("Expected `concurrency` to be a number from 1 and up");
  }
}
function imageSrcToImportId(imageSrc, filePath) {
  imageSrc = removeBase(imageSrc, IMAGE_IMPORT_PREFIX);
  if (isRemotePath(imageSrc)) {
    return;
  }
  const ext = imageSrc.split(".").at(-1);
  if (!ext || !VALID_INPUT_FORMATS.includes(ext)) {
    return;
  }
  const params = new URLSearchParams(CONTENT_IMAGE_FLAG);
  if (filePath) {
    params.set("importer", filePath);
  }
  return `${imageSrc}?${params.toString()}`;
}
function dataStoreSingleton() {
  let instance = void 0;
  return {
    get: async () => {
      if (!instance) {
        instance = DataStore.fromModule();
      }
      return instance;
    },
    set: (store) => {
      instance = store;
    }
  };
}
function createCollectionToGlobResultMap({
  globResult,
  contentDir: contentDir2
}) {
  const collectionToGlobResultMap = {};
  for (const key in globResult) {
    const keyRelativeToContentDir = key.replace(new RegExp(`^${contentDir2}`), "");
    const segments = keyRelativeToContentDir.split("/");
    if (segments.length <= 1)
      continue;
    const collection6 = segments[0];
    collectionToGlobResultMap[collection6] ??= {};
    collectionToGlobResultMap[collection6][key] = globResult[key];
  }
  return collectionToGlobResultMap;
}
function createGetCollection({
  contentCollectionToEntryMap: contentCollectionToEntryMap2,
  dataCollectionToEntryMap: dataCollectionToEntryMap2,
  getRenderEntryImport,
  cacheEntriesByCollection: cacheEntriesByCollection2
}) {
  return /* @__PURE__ */ __name(async function getCollection2(collection6, filter) {
    const hasFilter = typeof filter === "function";
    const store = await globalDataStore.get();
    let type;
    if (collection6 in contentCollectionToEntryMap2) {
      type = "content";
    } else if (collection6 in dataCollectionToEntryMap2) {
      type = "data";
    } else if (store.hasCollection(collection6)) {
      const { default: imageAssetMap } = await Promise.resolve().then(() => (init_astro_asset_imports_Dno0vHp6(), astro_asset_imports_Dno0vHp6_exports));
      const result = [];
      for (const rawEntry of store.values(collection6)) {
        const data6 = updateImageReferencesInData(rawEntry.data, rawEntry.filePath, imageAssetMap);
        const entry = {
          ...rawEntry,
          data: data6,
          collection: collection6
        };
        if (hasFilter && !filter(entry)) {
          continue;
        }
        result.push(entry);
      }
      return result;
    } else {
      console.warn(
        `The collection ${JSON.stringify(
          collection6
        )} does not exist or is empty. Ensure a collection directory with this name exists.`
      );
      return [];
    }
    const lazyImports = Object.values(
      type === "content" ? contentCollectionToEntryMap2[collection6] : dataCollectionToEntryMap2[collection6]
    );
    let entries = [];
    if (!Object.assign(__vite_import_meta_env__2, { _: process.env._ })?.DEV && cacheEntriesByCollection2.has(collection6)) {
      entries = cacheEntriesByCollection2.get(collection6);
    } else {
      const limit = pLimit(10);
      entries = await Promise.all(
        lazyImports.map(
          (lazyImport) => limit(async () => {
            const entry = await lazyImport();
            return type === "content" ? {
              id: entry.id,
              slug: entry.slug,
              body: entry.body,
              collection: entry.collection,
              data: entry.data,
              async render() {
                return render({
                  collection: entry.collection,
                  id: entry.id,
                  renderEntryImport: await getRenderEntryImport(collection6, entry.slug)
                });
              }
            } : {
              id: entry.id,
              collection: entry.collection,
              data: entry.data
            };
          })
        )
      );
      cacheEntriesByCollection2.set(collection6, entries);
    }
    if (hasFilter) {
      return entries.filter(filter);
    } else {
      return entries.slice();
    }
  }, "getCollection");
}
function createGetEntry({
  getEntryImport,
  getRenderEntryImport,
  collectionNames: collectionNames2
}) {
  return /* @__PURE__ */ __name(async function getEntry2(collectionOrLookupObject, _lookupId) {
    let collection6, lookupId;
    if (typeof collectionOrLookupObject === "string") {
      collection6 = collectionOrLookupObject;
      if (!_lookupId)
        throw new AstroError({
          ...UnknownContentCollectionError,
          message: "`getEntry()` requires an entry identifier as the second argument."
        });
      lookupId = _lookupId;
    } else {
      collection6 = collectionOrLookupObject.collection;
      lookupId = "id" in collectionOrLookupObject ? collectionOrLookupObject.id : collectionOrLookupObject.slug;
    }
    const store = await globalDataStore.get();
    if (store.hasCollection(collection6)) {
      const entry2 = store.get(collection6, lookupId);
      if (!entry2) {
        console.warn(`Entry ${collection6} \u2192 ${lookupId} was not found.`);
        return;
      }
      const { default: imageAssetMap } = await Promise.resolve().then(() => (init_astro_asset_imports_Dno0vHp6(), astro_asset_imports_Dno0vHp6_exports));
      entry2.data = updateImageReferencesInData(entry2.data, entry2.filePath, imageAssetMap);
      return {
        ...entry2,
        collection: collection6
      };
    }
    if (!collectionNames2.has(collection6)) {
      console.warn(`The collection ${JSON.stringify(collection6)} does not exist.`);
      return void 0;
    }
    const entryImport = await getEntryImport(collection6, lookupId);
    if (typeof entryImport !== "function")
      return void 0;
    const entry = await entryImport();
    if (entry._internal.type === "content") {
      return {
        id: entry.id,
        slug: entry.slug,
        body: entry.body,
        collection: entry.collection,
        data: entry.data,
        async render() {
          return render({
            collection: entry.collection,
            id: entry.id,
            renderEntryImport: await getRenderEntryImport(collection6, lookupId)
          });
        }
      };
    } else if (entry._internal.type === "data") {
      return {
        id: entry.id,
        collection: entry.collection,
        data: entry.data
      };
    }
    return void 0;
  }, "getEntry");
}
function updateImageReferencesInData(data6, fileName, imageAssetMap) {
  return new j(data6).map(function(ctx, val) {
    if (typeof val === "string" && val.startsWith(IMAGE_IMPORT_PREFIX)) {
      const src = val.replace(IMAGE_IMPORT_PREFIX, "");
      const id6 = imageSrcToImportId(src, fileName);
      if (!id6) {
        ctx.update(src);
        return;
      }
      const imported = imageAssetMap?.get(id6);
      if (imported) {
        ctx.update(imported);
      } else {
        ctx.update(src);
      }
    }
  });
}
async function render({
  collection: collection6,
  id: id6,
  renderEntryImport
}) {
  const UnexpectedRenderError = new AstroError({
    ...UnknownContentCollectionError,
    message: `Unexpected error while rendering ${String(collection6)} \u2192 ${String(id6)}.`
  });
  if (typeof renderEntryImport !== "function")
    throw UnexpectedRenderError;
  const baseMod = await renderEntryImport();
  if (baseMod == null || typeof baseMod !== "object")
    throw UnexpectedRenderError;
  const { default: defaultMod6 } = baseMod;
  if (isPropagatedAssetsModule(defaultMod6)) {
    const { collectedStyles: collectedStyles6, collectedLinks: collectedLinks6, collectedScripts: collectedScripts6, getMod: getMod6 } = defaultMod6;
    if (typeof getMod6 !== "function")
      throw UnexpectedRenderError;
    const propagationMod = await getMod6();
    if (propagationMod == null || typeof propagationMod !== "object")
      throw UnexpectedRenderError;
    const Content6 = createComponent({
      factory(result, baseProps, slots) {
        let styles = "", links = "", scripts = "";
        if (Array.isArray(collectedStyles6)) {
          styles = collectedStyles6.map((style) => {
            return renderUniqueStylesheet(result, {
              type: "inline",
              content: style
            });
          }).join("");
        }
        if (Array.isArray(collectedLinks6)) {
          links = collectedLinks6.map((link) => {
            return renderUniqueStylesheet(result, {
              type: "external",
              src: prependForwardSlash(link)
            });
          }).join("");
        }
        if (Array.isArray(collectedScripts6)) {
          scripts = collectedScripts6.map((script) => renderScriptElement(script)).join("");
        }
        let props = baseProps;
        if (id6.endsWith("mdx")) {
          props = {
            components: propagationMod.components ?? {},
            ...baseProps
          };
        }
        return createHeadAndContent(
          unescapeHTML(styles + links + scripts),
          renderTemplate`${renderComponent(
            result,
            "Content",
            propagationMod.Content,
            props,
            slots
          )}`
        );
      },
      propagation: "self"
    });
    return {
      Content: Content6,
      headings: propagationMod.getHeadings?.() ?? [],
      remarkPluginFrontmatter: propagationMod.frontmatter ?? {}
    };
  } else if (baseMod.Content && typeof baseMod.Content === "function") {
    return {
      Content: baseMod.Content,
      headings: baseMod.getHeadings?.() ?? [],
      remarkPluginFrontmatter: baseMod.frontmatter ?? {}
    };
  } else {
    throw UnexpectedRenderError;
  }
}
function isPropagatedAssetsModule(module) {
  return typeof module === "object" && module != null && "__astroPropagation" in module;
}
function createGlobLookup(glob) {
  return async (collection6, lookupId) => {
    const filePath = lookupMap[collection6]?.entries[lookupId];
    if (!filePath)
      return void 0;
    return glob[collection6][filePath];
  };
}
var e, t, o, n, r2, s, l, i, c, u, a, f, p, h, g, j, Node, Queue, CONTENT_IMAGE_FLAG, IMAGE_IMPORT_PREFIX, DataStore, globalDataStore, __vite_import_meta_env__2, contentDir, contentEntryGlob, contentCollectionToEntryMap, dataEntryGlob, dataCollectionToEntryMap, collectionToEntryMap, lookupMap, collectionNames, renderEntryGlob, collectionToRenderEntryMap, cacheEntriesByCollection, getCollection, getEntry;
var init_astro_content_DMpHUyuA = __esm({
  "dist/_worker.js/chunks/_astro_content_DMpHUyuA.mjs"() {
    "use strict";
    init_checked_fetch();
    init_modules_watch_stub();
    init_assets_service_B44g93js();
    init_server_Den36nYv();
    init_parse_B89E6tSO();
    globalThis.process ??= {};
    globalThis.process.env ??= {};
    e = /* @__PURE__ */ __name((e2) => Object.prototype.toString.call(e2), "e");
    t = /* @__PURE__ */ __name((e2) => ArrayBuffer.isView(e2) && !(e2 instanceof DataView), "t");
    o = /* @__PURE__ */ __name((t2) => "[object Date]" === e(t2), "o");
    n = /* @__PURE__ */ __name((t2) => "[object RegExp]" === e(t2), "n");
    r2 = /* @__PURE__ */ __name((t2) => "[object Error]" === e(t2), "r");
    s = /* @__PURE__ */ __name((t2) => "[object Boolean]" === e(t2), "s");
    l = /* @__PURE__ */ __name((t2) => "[object Number]" === e(t2), "l");
    i = /* @__PURE__ */ __name((t2) => "[object String]" === e(t2), "i");
    c = Array.isArray;
    u = Object.getOwnPropertyDescriptor;
    a = Object.prototype.propertyIsEnumerable;
    f = Object.getOwnPropertySymbols;
    p = Object.prototype.hasOwnProperty;
    h = Object.keys;
    __name(d, "d");
    __name(b, "b");
    __name(y, "y");
    g = { includeSymbols: false, immutable: false };
    __name(m, "m");
    j = /* @__PURE__ */ __name(class {
      #e;
      #t;
      constructor(e2, t2 = g) {
        this.#e = e2, this.#t = t2;
      }
      get(e2) {
        let t2 = this.#e;
        for (let o2 = 0; t2 && o2 < e2.length; o2++) {
          const n2 = e2[o2];
          if (!p.call(t2, n2) || !this.#t.includeSymbols && "symbol" == typeof n2)
            return;
          t2 = t2[n2];
        }
        return t2;
      }
      has(e2) {
        let t2 = this.#e;
        for (let o2 = 0; t2 && o2 < e2.length; o2++) {
          const n2 = e2[o2];
          if (!p.call(t2, n2) || !this.#t.includeSymbols && "symbol" == typeof n2)
            return false;
          t2 = t2[n2];
        }
        return true;
      }
      set(e2, t2) {
        let o2 = this.#e, n2 = 0;
        for (n2 = 0; n2 < e2.length - 1; n2++) {
          const t3 = e2[n2];
          p.call(o2, t3) || (o2[t3] = {}), o2 = o2[t3];
        }
        return o2[e2[n2]] = t2, t2;
      }
      map(e2) {
        return m(this.#e, e2, { immutable: true, includeSymbols: !!this.#t.includeSymbols });
      }
      forEach(e2) {
        return this.#e = m(this.#e, e2, this.#t), this.#e;
      }
      reduce(e2, t2) {
        const o2 = 1 === arguments.length;
        let n2 = o2 ? this.#e : t2;
        return this.forEach((t3, r3) => {
          t3.isRoot && o2 || (n2 = e2(t3, n2, r3));
        }), n2;
      }
      paths() {
        const e2 = [];
        return this.forEach((t2) => {
          e2.push(t2.path);
        }), e2;
      }
      nodes() {
        const e2 = [];
        return this.forEach((t2) => {
          e2.push(t2.node);
        }), e2;
      }
      clone() {
        const e2 = [], o2 = [], n2 = this.#t;
        return t(this.#e) ? this.#e.slice() : (/* @__PURE__ */ __name(function t2(r3) {
          for (let t3 = 0; t3 < e2.length; t3++)
            if (e2[t3] === r3)
              return o2[t3];
          if ("object" == typeof r3 && null !== r3) {
            const s2 = y(r3, n2);
            e2.push(r3), o2.push(s2);
            const l2 = n2.includeSymbols ? d : h;
            for (const e3 of l2(r3))
              s2[e3] = t2(r3[e3]);
            return e2.pop(), o2.pop(), s2;
          }
          return r3;
        }, "t"))(this.#e);
      }
    }, "j");
    Node = class {
      value;
      next;
      constructor(value) {
        this.value = value;
      }
    };
    __name(Node, "Node");
    Queue = class {
      #head;
      #tail;
      #size;
      constructor() {
        this.clear();
      }
      enqueue(value) {
        const node = new Node(value);
        if (this.#head) {
          this.#tail.next = node;
          this.#tail = node;
        } else {
          this.#head = node;
          this.#tail = node;
        }
        this.#size++;
      }
      dequeue() {
        const current = this.#head;
        if (!current) {
          return;
        }
        this.#head = this.#head.next;
        this.#size--;
        return current.value;
      }
      peek() {
        if (!this.#head) {
          return;
        }
        return this.#head.value;
      }
      clear() {
        this.#head = void 0;
        this.#tail = void 0;
        this.#size = 0;
      }
      get size() {
        return this.#size;
      }
      *[Symbol.iterator]() {
        let current = this.#head;
        while (current) {
          yield current.value;
          current = current.next;
        }
      }
    };
    __name(Queue, "Queue");
    __name(pLimit, "pLimit");
    __name(validateConcurrency, "validateConcurrency");
    CONTENT_IMAGE_FLAG = "astroContentImageFlag";
    IMAGE_IMPORT_PREFIX = "__ASTRO_IMAGE_";
    __name(imageSrcToImportId, "imageSrcToImportId");
    DataStore = class {
      _collections = /* @__PURE__ */ new Map();
      constructor() {
        this._collections = /* @__PURE__ */ new Map();
      }
      get(collectionName, key) {
        return this._collections.get(collectionName)?.get(String(key));
      }
      entries(collectionName) {
        const collection6 = this._collections.get(collectionName) ?? /* @__PURE__ */ new Map();
        return [...collection6.entries()];
      }
      values(collectionName) {
        const collection6 = this._collections.get(collectionName) ?? /* @__PURE__ */ new Map();
        return [...collection6.values()];
      }
      keys(collectionName) {
        const collection6 = this._collections.get(collectionName) ?? /* @__PURE__ */ new Map();
        return [...collection6.keys()];
      }
      has(collectionName, key) {
        const collection6 = this._collections.get(collectionName);
        if (collection6) {
          return collection6.has(String(key));
        }
        return false;
      }
      hasCollection(collectionName) {
        return this._collections.has(collectionName);
      }
      collections() {
        return this._collections;
      }
      /**
       * Attempts to load a DataStore from the virtual module.
       * This only works in Vite.
       */
      static async fromModule() {
        try {
          const data6 = await Promise.resolve().then(() => (init_astro_data_layer_content_tqJQiZwR(), astro_data_layer_content_tqJQiZwR_exports));
          if (data6.default instanceof Map) {
            return DataStore.fromMap(data6.default);
          }
          const map = unflatten(data6.default);
          return DataStore.fromMap(map);
        } catch {
        }
        return new DataStore();
      }
      static async fromMap(data6) {
        const store = new DataStore();
        store._collections = data6;
        return store;
      }
    };
    __name(DataStore, "DataStore");
    __name(dataStoreSingleton, "dataStoreSingleton");
    globalDataStore = dataStoreSingleton();
    __vite_import_meta_env__2 = { "ASSETS_PREFIX": void 0, "BASE_URL": "/", "DEV": false, "MODE": "production", "PROD": true, "SITE": void 0, "SSR": true };
    __name(createCollectionToGlobResultMap, "createCollectionToGlobResultMap");
    __name(createGetCollection, "createGetCollection");
    __name(createGetEntry, "createGetEntry");
    __name(updateImageReferencesInData, "updateImageReferencesInData");
    __name(render, "render");
    __name(isPropagatedAssetsModule, "isPropagatedAssetsModule");
    contentDir = "/src/content/";
    contentEntryGlob = /* @__PURE__ */ Object.assign({ "/src/content/blog/How to quickly deploy a static website.md": () => Promise.resolve().then(() => (init_How_to_quickly_deploy_a_static_website_D5tqu43(), How_to_quickly_deploy_a_static_website_D5tqu43_exports)), "/src/content/blog/cannon-excellence.md": () => Promise.resolve().then(() => (init_cannon_excellence_BOiohCMI(), cannon_excellence_BOiohCMI_exports)), "/src/content/blog/cutting-edge-tablets.md": () => Promise.resolve().then(() => (init_cutting_edge_tablets_CDLNkaVM(), cutting_edge_tablets_CDLNkaVM_exports)), "/src/content/blog/elevate-your-mobile-experience.md": () => Promise.resolve().then(() => (init_elevate_your_mobile_experience_C9ooJEK7(), elevate_your_mobile_experience_C9ooJEK7_exports)), "/src/content/blog/guardian-of-the-digital-realm.md": () => Promise.resolve().then(() => (init_guardian_of_the_digital_realm_BZNTAlFU(), guardian_of_the_digital_realm_BZNTAlFU_exports)) });
    contentCollectionToEntryMap = createCollectionToGlobResultMap({
      globResult: contentEntryGlob,
      contentDir
    });
    dataEntryGlob = /* @__PURE__ */ Object.assign({});
    dataCollectionToEntryMap = createCollectionToGlobResultMap({
      globResult: dataEntryGlob,
      contentDir
    });
    collectionToEntryMap = createCollectionToGlobResultMap({
      globResult: { ...contentEntryGlob, ...dataEntryGlob },
      contentDir
    });
    lookupMap = {};
    lookupMap = { "blog": { "type": "content", "entries": { "capturing-lifes-moments-with-canon-excellence": "/src/content/blog/cannon-excellence.md", "how-to-quickly-deploy-a-static-website": "/src/content/blog/How to quickly deploy a static website.md", "unleash-creativity-with-these-cutting-edge-tablets": "/src/content/blog/cutting-edge-tablets.md", "elevate-your-mobile-experience-with-samsung": "/src/content/blog/elevate-your-mobile-experience.md", "guardian-of-the-digital-realm-web-security": "/src/content/blog/guardian-of-the-digital-realm.md" } } };
    collectionNames = new Set(Object.keys(lookupMap));
    __name(createGlobLookup, "createGlobLookup");
    renderEntryGlob = /* @__PURE__ */ Object.assign({ "/src/content/blog/How to quickly deploy a static website.md": () => Promise.resolve().then(() => (init_How_to_quickly_deploy_a_static_website_DQuK3059(), How_to_quickly_deploy_a_static_website_DQuK3059_exports)), "/src/content/blog/cannon-excellence.md": () => Promise.resolve().then(() => (init_cannon_excellence_tSsv6KYc(), cannon_excellence_tSsv6KYc_exports)), "/src/content/blog/cutting-edge-tablets.md": () => Promise.resolve().then(() => (init_cutting_edge_tablets_BY8xOBbU(), cutting_edge_tablets_BY8xOBbU_exports)), "/src/content/blog/elevate-your-mobile-experience.md": () => Promise.resolve().then(() => (init_elevate_your_mobile_experience_BP2ZP5B2(), elevate_your_mobile_experience_BP2ZP5B2_exports)), "/src/content/blog/guardian-of-the-digital-realm.md": () => Promise.resolve().then(() => (init_guardian_of_the_digital_realm_F_pfaew(), guardian_of_the_digital_realm_F_pfaew_exports)) });
    collectionToRenderEntryMap = createCollectionToGlobResultMap({
      globResult: renderEntryGlob,
      contentDir
    });
    cacheEntriesByCollection = /* @__PURE__ */ new Map();
    getCollection = createGetCollection({
      contentCollectionToEntryMap,
      dataCollectionToEntryMap,
      getRenderEntryImport: createGlobLookup(collectionToRenderEntryMap),
      cacheEntriesByCollection
    });
    getEntry = createGetEntry({
      getEntryImport: createGlobLookup(collectionToEntryMap),
      getRenderEntryImport: createGlobLookup(collectionToRenderEntryMap),
      collectionNames
    });
  }
});

// dist/_worker.js/pages/articles/api/search.json.astro.mjs
var search_json_astro_exports = {};
__export(search_json_astro_exports, {
  page: () => page4,
  renderers: () => renderers
});
var GET2, _page4, page4;
var init_search_json_astro = __esm({
  "dist/_worker.js/pages/articles/api/search.json.astro.mjs"() {
    "use strict";
    init_checked_fetch();
    init_modules_watch_stub();
    init_astro_content_DMpHUyuA();
    init_renderers();
    globalThis.process ??= {};
    globalThis.process.env ??= {};
    GET2 = /* @__PURE__ */ __name(async ({ url: url6 }) => {
      const query = url6.searchParams.get("query");
      if (query === null) {
        return new Response(
          JSON.stringify({
            error: "Query param is missing"
          }),
          {
            status: 400,
            // Bad request
            headers: {
              "Content-Type": "application/json"
            }
          }
        );
      }
      const allBlogArticles = await getCollection(
        "blog"
      );
      const searchResults = allBlogArticles.filter((article) => {
        const titleMatch = article.data.title.toLowerCase().includes(query.toLowerCase());
        const bodyMatch = article.body.toLowerCase().includes(query.toLowerCase());
        const slugMatch = article.slug.toLowerCase().includes(query.toLowerCase());
        return titleMatch || bodyMatch || slugMatch;
      });
      return new Response(JSON.stringify(searchResults), {
        status: 200,
        headers: {
          "Content-Type": "application/json"
        }
      });
    }, "GET");
    _page4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
      __proto__: null,
      GET: GET2
    }, Symbol.toStringTag, { value: "Module" }));
    page4 = /* @__PURE__ */ __name(() => _page4, "page");
  }
});

// dist/_worker.js/chunks/utils_nZr4aA_r.mjs
function formatDate(date) {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric"
  };
  return new Date(date).toLocaleDateString(void 0, options);
}
var init_utils_nZr4aA_r = __esm({
  "dist/_worker.js/chunks/utils_nZr4aA_r.mjs"() {
    "use strict";
    init_checked_fetch();
    init_modules_watch_stub();
    globalThis.process ??= {};
    globalThis.process.env ??= {};
    __name(formatDate, "formatDate");
  }
});

// dist/_worker.js/pages/articles.astro.mjs
var articles_astro_exports = {};
__export(articles_astro_exports, {
  page: () => page5,
  renderers: () => renderers
});
var $$ArticleIcon, $$VideoIcon, $$Astro$12, $$ArticleCard, $$Astro2, $$Index, $$file3, $$url3, _page5, page5;
var init_articles_astro = __esm({
  "dist/_worker.js/pages/articles.astro.mjs"() {
    "use strict";
    init_checked_fetch();
    init_modules_watch_stub();
    init_server_Den36nYv();
    init_Layout_fLnNkG_9();
    init_utils_nZr4aA_r();
    init_astro_content_DMpHUyuA();
    init_renderers();
    globalThis.process ??= {};
    globalThis.process.env ??= {};
    $$ArticleIcon = createComponent(($$result, $$props, $$slots) => {
      return renderTemplate`${maybeRenderHead()}<svg class="mr-1 w-3 h-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z" clip-rule="evenodd"></path><path d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z"></path></svg>`;
    }, "/home/abdi/Projects/Addition/Addition-Plus-Website/src/components/Icons/ArticleIcon.astro", void 0);
    $$VideoIcon = createComponent(($$result, $$props, $$slots) => {
      return renderTemplate`${maybeRenderHead()}<svg class="mr-1 w-3 h-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"></path></svg>`;
    }, "/home/abdi/Projects/Addition/Addition-Plus-Website/src/components/Icons/VideoIcon.astro", void 0);
    $$Astro$12 = createAstro();
    $$ArticleCard = createComponent(($$result, $$props, $$slots) => {
      const Astro2 = $$result.createAstro($$Astro$12, $$props, $$slots);
      Astro2.self = $$ArticleCard;
      const { article } = Astro2.props;
      return renderTemplate`${maybeRenderHead()}<article class="p-6 bg-white rounded-3xl border border-gray-200 shadow-card"> <div class="flex justify-between items-center mb-5 text-gray-500"> <span class="bg-[#1E40AF] text-white text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded"> ${article.data.type == "Article" ? renderTemplate`${renderComponent($$result, "ArticleIcon", $$ArticleIcon, {})}` : renderTemplate`${renderComponent($$result, "VideoIcon", $$VideoIcon, {})}`} ${article.data.type} </span> <span class="text-sm">${formatDate(article.data.pubDate)}</span> </div> <h2 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">${article.data.title}</h2> <p class="mb-5 font-light text-gray-500" style="white-space: pre-line">${article.data.summary}</p> <div class="flex justify-between items-center"> <div class="flex items-center space-x-4"> <img class="w-7 h-7 rounded-full"${addAttribute(article.data.authImage, "src")}${addAttribute(article.data.author + " cover", "alt")}> <span class="font-medium"> ${article.data.author} </span> </div> <a${addAttribute("/articles/" + article.slug, "href")} class="inline-flex items-center font-medium text-black hover:text-[#1E40AF]">
Read more
<svg class="ml-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg> </a> </div> </article>`;
    }, "/home/abdi/Projects/Addition/Addition-Plus-Website/src/components/ArticleCard.astro", void 0);
    $$Astro2 = createAstro();
    $$Index = createComponent(async ($$result, $$props, $$slots) => {
      const Astro2 = $$result.createAstro($$Astro2, $$props, $$slots);
      Astro2.self = $$Index;
      +Astro2.url.searchParams.get("page") || 1;
      const allBlogArticles = (await getCollection("blog")).sort((a2, b2) => b2.data.pubDate.valueOf() - a2.data.pubDate.valueOf());
      return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Positivus - Blog" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="space-y-20"> ${renderComponent($$result2, "Container", $$Container, {}, { "default": ($$result3) => renderTemplate` <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6"> <div class="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8"> <h2 class="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-gray-900">Our Blog</h2> <p class="font-light text-gray-500 sm:text-xl">We use an agile approach to test assumptions and connect with the needs of your audience early and often.</p> </div> <div class="grid gap-8 lg:grid-cols-2"> ${allBlogArticles.map((article) => renderTemplate`${renderComponent($$result3, "ArticleCard", $$ArticleCard, { "article": article })}`)} </div> </div> ` })} </main> ` })}`;
    }, "/home/abdi/Projects/Addition/Addition-Plus-Website/src/pages/articles/index.astro", void 0);
    $$file3 = "/home/abdi/Projects/Addition/Addition-Plus-Website/src/pages/articles/index.astro";
    $$url3 = "/articles";
    _page5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
      __proto__: null,
      default: $$Index,
      file: $$file3,
      url: $$url3
    }, Symbol.toStringTag, { value: "Module" }));
    page5 = /* @__PURE__ */ __name(() => _page5, "page");
  }
});

// dist/_worker.js/pages/articles/_---slug_.astro.mjs
var slug_astro_exports = {};
__export(slug_astro_exports, {
  page: () => page6,
  renderers: () => renderers
});
var $$Astro3, $$, $$file4, $$url4, _page6, page6;
var init_slug_astro = __esm({
  "dist/_worker.js/pages/articles/_---slug_.astro.mjs"() {
    "use strict";
    init_checked_fetch();
    init_modules_watch_stub();
    init_server_Den36nYv();
    init_Layout_fLnNkG_9();
    init_astro_content_DMpHUyuA();
    init_utils_nZr4aA_r();
    init_renderers();
    globalThis.process ??= {};
    globalThis.process.env ??= {};
    $$Astro3 = createAstro();
    $$ = createComponent(async ($$result, $$props, $$slots) => {
      const Astro2 = $$result.createAstro($$Astro3, $$props, $$slots);
      Astro2.self = $$;
      const { slug: slug6 } = Astro2.params;
      if (slug6 === void 0) {
        throw new Error("Slug is required");
      }
      const entry = await getEntry("blog", slug6);
      if (entry === void 0) {
        return Astro2.redirect("/404");
      }
      const { Content: Content6 } = await entry.render();
      return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Welcome to My site" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="space-y-40 mb-40 pt-24"> ${renderComponent($$result2, "Container", $$Container, {}, { "default": ($$result3) => renderTemplate` <section class="bg-white"> <div class="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-1 lg:py-16 lg:px-6"> <div class="font-light text-gray-500 sm:text-lg"> <a href="/articles" class="inline-flex items-center font-medium text-black hover:text-[#1E40AF] my-4"> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16l-4-4m0 0l4-4m-4 4h18"></path> </svg> <span class="ml-1 font-bold text-lg">All Articles</span> </a> <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900">${entry.data.title}</h2> <h3 class="text-lg mb-2">Written by ${entry.data.author} on ${formatDate(entry.data.pubDate)}</h3> <img${addAttribute("/blog/" + entry.data.image, "src")} alt="Article Image" class="w-full h-auto rounded-xl my-6"> <div class="content"> ${renderComponent($$result3, "Content", Content6, {})} </div> </div> </div> </section> ` })} </main> ` })}`;
    }, "/home/abdi/Projects/Addition/Addition-Plus-Website/src/pages/articles/[...slug].astro", void 0);
    $$file4 = "/home/abdi/Projects/Addition/Addition-Plus-Website/src/pages/articles/[...slug].astro";
    $$url4 = "/articles/[...slug]";
    _page6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
      __proto__: null,
      default: $$,
      file: $$file4,
      url: $$url4
    }, Symbol.toStringTag, { value: "Module" }));
    page6 = /* @__PURE__ */ __name(() => _page6, "page");
  }
});

// dist/_worker.js/pages/index.astro.mjs
var index_astro_exports = {};
__export(index_astro_exports, {
  page: () => page7,
  renderers: () => renderers
});
var $$Hero, $$Astro$22, $$Topic, servicesData, $$Services, team, process2, teamData, $$Astro$13, $$Accordion, $$Team, $$SwiperSlider, $$Testimonial, $$Contact, $$Case, $$Astro4, $$Index2, $$file5, $$url5, _page7, page7;
var init_index_astro = __esm({
  "dist/_worker.js/pages/index.astro.mjs"() {
    "use strict";
    init_checked_fetch();
    init_modules_watch_stub();
    init_server_Den36nYv();
    init_Layout_fLnNkG_9();
    init_renderers();
    globalThis.process ??= {};
    globalThis.process.env ??= {};
    $$Hero = createComponent(($$result, $$props, $$slots) => {
      return renderTemplate`${renderComponent($$result, "Container", $$Container, {}, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="relative flex flex-col-reverse items-center md:flex-row" id="hero"> <div class="row items-center py-5 md:w-6/12 md:pb-20 md:pt-10"> <div class="text-left space-y-3"> <h1 class="text-5xl font-medium leading-none md:text-6xl text-center md:text-left">Empowering Digital<br>Innovation with<br> Precision & Passion</h1> <p class="mt-6 mb-8  text-xl font-normal leading-7 sm:mb-12 text-center md:text-left">At Addition+, we transform ideas into digital experiences. From custom websites and web apps to mobile solutions and AI-driven innovations, our expertise brings your vision to life with cutting-edge technology and strategic creativity.</p> <div class="w-full justify-center md:justify-start items-center inline-flex"> <a href="https://github.com/manulthanura/Positivus" target="_blank" class="px-8 py-5 bg-zinc-900 hover:bg-white rounded-2xl text-center text-white hover:text-black border text-xl font-normal leading-7">Book a consultation
</a> </div> </div> </div> <div class="flex items-center py-5 md:w-6/12 md:pb-20 md:pt-10"> <img src="/Hero.svg" width="100%" alt="Hero"> </div> </div> <div class="flex-row items-center"> <div class="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-6"> <div class="p-4 grayscale transition duration-200 hover:grayscale-0"> <img src="./clients/01.svg" class="h-12 w-auto mx-auto" loading="lazy" alt="client logo" width="" height=""> </div> <div class="p-4 grayscale transition duration-200 hover:grayscale-0"> <img src="./clients/02.svg" class="h-12 w-auto mx-auto" loading="lazy" alt="client logo" width="" height=""> </div> <div class="p-4 flex grayscale transition duration-200 hover:grayscale-0"> <img src="./clients/03.svg" class="h-9 w-auto m-auto" loading="lazy" alt="client logo" width="" height=""> </div> <div class="p-4 grayscale transition duration-200 hover:grayscale-0"> <img src="./clients/04.svg" class="h-12 w-auto mx-auto" loading="lazy" alt="client logo" width="" height=""> </div> <div class="p-4 flex grayscale transition duration-200 hover:grayscale-0"> <img src="./clients/05.svg" class="h-8 w-auto m-auto" loading="lazy" alt="client logo" width="" height=""> </div> <div class="p-4 grayscale transition duration-200 hover:grayscale-0"> <img src="./clients/06.svg" class="h-12 w-auto mx-auto" loading="lazy" alt="client logo" width="" height=""> </div> </div> </div> ` })}`;
    }, "/home/abdi/Projects/Addition/Addition-Plus-Website/src/components/Hero.astro", void 0);
    $$Astro$22 = createAstro();
    $$Topic = createComponent(($$result, $$props, $$slots) => {
      const Astro2 = $$result.createAstro($$Astro$22, $$props, $$slots);
      Astro2.self = $$Topic;
      const { title, description } = Astro2.props;
      return renderTemplate`${maybeRenderHead()}<div class="grid place-items-center gap-5 mb-10 md:flex"> <h2 class="text-4xl sm:text-5xl px-1.5 font-medium bg-[#1E40AF] text-white rounded-md"> ${title} </h2> <p class="text-xl font-normal text-center md:text-start lg:w-2/3"> ${description} </p> </div>`;
    }, "/home/abdi/Projects/Addition/Addition-Plus-Website/src/components/Topic.astro", void 0);
    servicesData = [
      {
        id: 1,
        name1: "AI & Machine Learning",
        name2: "Solutions",
        background: "h-[310px] p-12 bg-zinc-100 rounded-[45px] shadow-card border border-black justify-between items-center flex text-black",
        arrow: "./services/ag.svg",
        link: "./",
        image: "./services/01.svg"
      },
      {
        id: 2,
        name1: "Web App ",
        name2: "Development",
        background: "h-[310px] p-12 bg-[#1E40AF] rounded-[45px] shadow-card border border-black justify-between items-center flex text-white",
        arrow: "./services/ag.svg",
        link: "./",
        image: "./services/02.svg"
      },
      {
        id: 3,
        name1: "Mobile App",
        name2: "Development",
        background: "h-[310px] p-12 bg-black rounded-[45px] shadow-card border border-black justify-between items-center flex text-white",
        arrow: "./services/aw.svg",
        link: "./",
        image: "./services/03.svg"
      },
      {
        id: 4,
        name1: "Website",
        name2: "Development",
        background: "h-[310px] p-12 bg-zinc-100 rounded-[45px] shadow-card border border-black justify-between items-center flex text-black",
        arrow: "./services/ag.svg",
        link: "./",
        image: "./services/04.svg"
      }
    ];
    $$Services = createComponent(($$result, $$props, $$slots) => {
      return renderTemplate`${renderComponent($$result, "Container", $$Container, {}, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="relative flex flex-col items-center md:flex-row" id="services"> ${renderComponent($$result2, "Topic", $$Topic, { "title": "Our Services", "description": "Our digital marketing agency helps businesses grow and succeed online through a range of services including SEO, PPC, social media marketing, and content creation" })}</div> <div class="flex-row items-center py-5"> <div class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4"> <!-- card start--> ${servicesData.map(({ background, name1, name2, arrow, link, image }) => renderTemplate`<div${addAttribute(background, "class")}> <div class="flex-col justify-center items-start gap-[93px] inline-flex"> <div class="flex-col justify-start items-start flex"> <div class="px-[7px] bg-lime-300 rounded-[7px] flex-col justify-start items-start gap-2.5 flex"> <div class=" text-3xl font-medium">${name1}</div> </div> <div class="px-[7px] bg-lime-300 rounded-[7px] flex-col justify-start items-start gap-2.5 flex"> <div class="text-3xl font-medium">${name2}</div> </div> </div> <a class="justify-start items-center gap-[15px] inline-flex"${addAttribute(link, "href")}> <div class="w-[41px] h-[41px] relative"> <img class="w-[41px] h-[41px] left-0 top-0 absolute"${addAttribute(arrow, "src")}> </div> <div class="text-xl font-normal leading-7">Learn more</div> </a> </div> <div class="w-[210px] h-[170px] pt-0.5 pb-[1.95px] justify-center items-center flex"> <img class="hidden md:block"${addAttribute(image, "src")}> </div> </div>`)} <!-- card end--> </div> </div> <div class="flex-row items-center my-6 p-14 bg-zinc-100 rounded-[45px]"> <div class="grid grid-cols-1 md:grid-cols-2 gap-4"> <div class="justify-start items-center gap-[275px] flex"> <div class="flex-col justify-start items-start gap-[26px] inline-flex text-black"> <div class="text-3xl font-medium">Ready to Transform Your Vision into Reality?</div> <div class="text-lg font-normal">Bring your ideas to life with our expert digital solutions. Let’s start building something exceptional together.</div> <a href="/" class="px-[35px] py-5 bg-zinc-900 hover:bg-white text-white hover:text-black border rounded-[14px] justify-start items-start gap-2.5 inline-flex"> <div class="text-center text-xl font-normal leading-7">Get Your Free Quote Now</div> </a> </div> </div> <div class="hidden md:grid justify-items-center -m-20"> <img src="/services/Illustration.svg" width="50%" alt="cat"> </div> </div> </div> ` })}`;
    }, "/home/abdi/Projects/Addition/Addition-Plus-Website/src/components/Services.astro", void 0);
    team = [
      {
        title: "CEO and Co-Founder",
        name: "Goliat Oboyo",
        description: "10+ years of experience in digital marketing. Expertise in SEO, PPC, and content strategy",
        profile: "/team/c1.png",
        link: "/"
      },
      {
        title: "COO",
        name: "KC Savant",
        description: "7+ years of experience in project management and team leadership. Strong organizational and communication skills",
        profile: "/team/c2.png",
        link: "/"
      },
      {
        title: "CTO",
        name: "Biniyam Ajaw",
        description: "5+ years of experience in SEO and content creation. Proficient in keyword research and on-page optimization",
        profile: "/team/c3.png",
        link: "/"
      }
    ];
    process2 = [
      {
        index: 1,
        label: "Request a Quote",
        content: "Start by sharing your vision with us. We\u2019ll provide a tailored quote to fit your project needs and goals."
      },
      {
        index: 2,
        label: "Project Planning",
        content: "Our team collaborates with you to outline goals, timelines, and deliverables, ensuring a clear roadmap for success."
      },
      {
        index: 3,
        label: "Design & Development",
        content: "Watch your ideas come to life as we craft a unique, user-friendly solution, refining each detail along the way."
      },
      {
        index: 4,
        label: "Testing & Feedback",
        content: "We rigorously test your solution to ensure quality and performance, integrating your feedback to meet expectations."
      },
      {
        index: 5,
        label: "Deployment & Launch",
        content: "Once approved, we handle the deployment, making your digital solution live and ready to impress."
      },
      {
        index: 6,
        label: "Ongoing Support & Maintenance",
        content: "Stay supported post-launch with updates, optimizations, and maintenance to keep your solution running smoothly."
      }
    ];
    teamData = {
      team,
      process: process2
    };
    $$Astro$13 = createAstro();
    $$Accordion = createComponent(($$result, $$props, $$slots) => {
      const Astro2 = $$result.createAstro($$Astro$13, $$props, $$slots);
      Astro2.self = $$Accordion;
      const { index, title, description } = Astro2.props;
      return renderTemplate`${maybeRenderHead()}<div id="accordion__item" class="accordion__item group h-[160px] bg-zinc-100 overflow-hidden w-full transition-all duration-500 mb-[30px] rounded-[45px] border border-dark shadow-[0px_5px_0px_#191a23]"> <button class="accordion__toggle w-full h-[160px] flex items-center justify-between p-[60px] cursor-pointer"${addAttribute(`${title} accordion__item menu button`, "id")} aria-expanded="false"${addAttribute(`${title} accordion__item menu content`, "aria-controls")}> <div class="flex items-center gap-[25px]"> <span class="hidden sm:block sm:text-6xl">0${index}</span> ${title} </div> <div class="bg-white w-[58px] h-[58px] flex justify-center items-center rounded-full border border-dark"> <div class="accordion__icon h-10 w-10 transition-transform duration-300 flex justify-center items-center relative" aria-hidden="true"></div> </div> </button> <div${addAttribute(`${title} accordion__item menu content`, "id")}${addAttribute(`${title} accordion__item menu button `, "aria-labelledby")} class="accordion__content px-[60px]"> <div class="w-full h-[2px] bg-black"></div> <p class="prose mb-4 mt-1 max-w-full pt-5 pb-[60px] transition-[height]"> ${description} </p> </div> </div> `;
    }, "/home/abdi/Projects/Addition/Addition-Plus-Website/src/components/Accordion.astro", void 0);
    $$Team = createComponent(($$result, $$props, $$slots) => {
      return renderTemplate`${renderComponent($$result, "Container", $$Container, {}, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="relative flex flex-col items-center md:flex-row"> ${renderComponent($$result2, "Topic", $$Topic, { "title": "Process", "description": "Step-by-Step Guide to Achieving Your Business Goals" })} </div> <div class="my-6"> <div class="space-y-10"> ${teamData.process.map((item) => {
        return renderTemplate`${renderComponent($$result2, "Accordion", $$Accordion, { "index": item.index, "title": item.label, "description": item.content })}`;
      })} </div> </div> <div class="relative flex flex-col items-center md:flex-row pt-6"> ${renderComponent($$result2, "Topic", $$Topic, { "title": "Team", "description": "Meet the skilled and experienced team behind our successful company" })} </div> <div class="flex-row items-center py-5" id="team"> <div class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-4"> ${teamData.team.map(({ title, description, name, link, profile }) => renderTemplate`<div class="h-[331px] px-[35px] py-10 bg-white rounded-[45px] shadow-card border border-zinc-900 flex-col justify-start items-start gap-2.5 inline-flex text-black"> <div class="flex-col justify-start items-start gap-7 flex"> <div class="self-stretch justify-start items-start inline-flex"> <div class="grow shrink basis-0 justify-start items-center gap-8 flex"> <div class="h-[102.82px] left-0 top-0 relative"> <img${addAttribute(profile, "src")}${addAttribute(name, "alt")}> </div> <div class="flex-col justify-end items-start inline-flex"> <div class="text-lg font-normal">${title}</div> <div class="text-xl font-medium">${name}</div> </div> </div> <a class="top-0 right-0"${addAttribute(link, "href")}> <img src="/team/lng.svg" alt="vector"> </a> </div> <hr class="w-full border border-black"> <p class="text-sm md:text-lg">${description}</p> </div> </div>`)} </div> </div> <div class="w-full justify-center md:justify-end items-center inline-flex"> <!-- <button class="px-8 py-5 bg-zinc-900 hover:bg-white rounded-2xl text-center text-white hover:text-black border text-xl font-normal leading-7">See all team
    </button> --> </div> ` })}`;
    }, "/home/abdi/Projects/Addition/Addition-Plus-Website/src/components/Team.astro", void 0);
    $$SwiperSlider = createComponent(($$result, $$props, $$slots) => {
      const slides = [
        { index: 1, name: "John Johnson", description: "Marketing dierector at XYZ" },
        { index: 2, name: "Ana Banana", description: "Marketing dierector at XYZ" },
        {
          index: 3,
          name: "Camilo Corintio",
          description: "Marketing dierector at XYZ"
        },
        { index: 4, name: "Karla Kaz", description: "Marketing dierector at XYZ" },
        { index: 5, name: "Johanna Jana", description: "Marketing dierector at XYZ" }
      ];
      return renderTemplate`${maybeRenderHead()}<div id="ProjectSlider" class="swiper mt-10"${addAttribute({
        "--swiper-pagination-color": "#B9FF66",
        "--swiper-pagination-bullet-inactive-color": "#fff",
        "--swiper-pagination-bullet-inactive-opacity": "1",
        "--swiper-pagination-bullet-size": "19px",
        "--swiper-pagination-bullet-horizontal-gap": "10px"
      }, "style")} data-astro-cid-g42mys5r> <div class="swiper-wrapper mt-[84px] mb-[124px]" data-cursor="swipe" data-astro-cid-g42mys5r> ${slides.map((slide) => renderTemplate`<div class="swiper-slide text-white flex flex-col" role="group"${addAttribute(`${slide.index} / ${slides.length}`, "aria-label")} data-astro-cid-g42mys5r> <div class="flex flex-col justify-center items-center py-[48px] px-6 sm:px-[52px]" data-astro-cid-g42mys5r> <p class="bubble" data-astro-cid-g42mys5r>
"We have been working with Positivus for the past year and have
              seen a significant increase in website traffic and leads as a
              result of their efforts. The team is professional, responsive, and
              truly cares about the success of our business. We highly recommend
              Positivus to any company looking to grow their online presence."
</p> </div> <div class="w-full px-10 sm:px-20 " data-astro-cid-g42mys5r> <div class="text-lime text-base md:text-xl font-medium" data-astro-cid-g42mys5r>${slide.name}</div> <div data-astro-cid-g42mys5r>${slide.description}</div> </div> </div>`)} </div> <div class="flex justify-around lg:justify-center mb-[68px] lg:gap-[189px]" data-astro-cid-g42mys5r> <div class="swiper-button-prev w-7 h-7 sm:w-10 sm:h-10" data-astro-cid-g42mys5r> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-astro-cid-g42mys5r><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--> <path fill="#ffffff" d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" data-astro-cid-g42mys5r></path></svg> </div> <div class="swiper-pagination" data-astro-cid-g42mys5r></div> <div class="swiper-button-next w-7 h-7 sm:w-10 sm:h-10 rotate-180" data-astro-cid-g42mys5r> <svg xmlns="http://www.w3.org/2000/svg " viewBox="0 0 448 512" data-astro-cid-g42mys5r><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--> <path fill="#ffffff" d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" data-astro-cid-g42mys5r></path></svg> </div> </div> </div>  `;
    }, "/home/abdi/Projects/Addition/Addition-Plus-Website/src/components/SwiperSlider.astro", void 0);
    $$Testimonial = createComponent(($$result, $$props, $$slots) => {
      return renderTemplate`${renderComponent($$result, "Container", $$Container, {}, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="relative flex flex-col items-center md:flex-row"> ${renderComponent($$result2, "Topic", $$Topic, { "title": "Testimonials", "description": "Hear from Our Satisfied Clients: Read Our Testimonials to Learn More about Our Digital Marketing Services" })} </div> <div class="rounded-[45px] bg-black mb-[150px] text-white"> ${renderComponent($$result2, "SwiperSlider", $$SwiperSlider, {})} </div> ` })}`;
    }, "/home/abdi/Projects/Addition/Addition-Plus-Website/src/components/Testimonial.astro", void 0);
    $$Contact = createComponent(($$result, $$props, $$slots) => {
      return renderTemplate`${renderComponent($$result, "Container", $$Container, {}, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="relative flex flex-col items-center md:flex-row"> ${renderComponent($$result2, "Topic", $$Topic, { "title": "Contact", "description": "Connect with Us: Let's Discuss Your AI and Software Needs" })} </div> <div class="relative flex flex-col items-center md:flex-row my-6 bg-zinc-100 rounded-[45px]"> <div class="row items-center py-12 px-4 md:px-20 md:w-8/12 md:py-10"> <form action="#" class="space-y-8 md:w-full"> <div class="flex"> <div class="flex items-center me-4"> <input id="inline-radio" type="radio" value="" name="inline-radio-group" class="w-4 h-4 text-lime bg-black border-black focus:ring-lime"> <label for="inline-radio" class="ms-2 text-base font-medium text-black">Say Hi</label> </div> <div class="flex items-center me-4 mx-8 md:mx-20"> <input id="inline-2-radio" type="radio" value="" name="inline-radio-group" class="w-4 h-4 text-lime bg-black border-black focus:ring-lime"> <label for="inline-2-radio" class="ms-2 text-base font-medium text-black">Get a Quote</label> </div> </div> <div> <label for="email" class="block mb-2 text-base font-medium text-black">Name</label> <input type="email" id="email" class="shadow-sm bg-white border text-black text-base rounded-lg focus:ring-black focus:border-black block w-full p-2.5" placeholder="Name" required> </div> <div> <label for="subject" class="block mb-2 text-base font-medium text-black">Email</label> <input type="text" id="subject" class="block p-3 w-full text-base text-black bg-white rounded-lg border shadow-sm focus:ring-black focus:border-black" placeholder="Email" required> </div> <div class="sm:col-span-2"> <label for="message" class="block mb-2 text-base font-medium text-black dark:text-gray-400">Message</label> <textarea id="message" rows="6" class="block p-2.5 w-full text-base text-black bg-white rounded-lg shadow-sm border focus:ring-black focus:border-black" placeholder="Message"></textarea> </div> <button type="submit" class="w-full py-5 bg-zinc-900 rounded-[14px] justify-center gap-2.5 inline-flex"> <div class="text-center text-white text-xl font-normal leading-7">Send Message</div> </button> </form> </div> <div class="hidden md:grid md:justify-items-end md:w-4/12 md:py-2"> <img src="./clients/contact.svg" alt="c" width="80%"> </div> </div> ` })}`;
    }, "/home/abdi/Projects/Addition/Addition-Plus-Website/src/components/Contact.astro", void 0);
    $$Case = createComponent(($$result, $$props, $$slots) => {
      return renderTemplate`${renderComponent($$result, "Container", $$Container, {}, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="relative flex flex-col items-center md:flex-row" id="projects"> ${renderComponent($$result2, "Topic", $$Topic, { "title": "Case Studies", "description": "Explore Real-Life Examples of Our Proven Digital Marketing Success through Our Case Studies" })} </div> <div class="w-full p-12 bg-zinc-900 rounded-[45px] justify-start items-start gap-16 inline-flex text-white"> <div class="grid grid-cols-1 md:grid-cols-3 gap-2 divide-x-0 md:divide-x divide-y md:divide-y-0"> <div class="flex-col items-start gap-5 inline-flex px-2 md:px-6 py-6 md:py-2"> <div class="w-full text-lg font-normal">For a local restaurant, we implemented a targeted PPC campaign that resulted in a 50% increase in website traffic and a 25% increase in sales.</div> <div class="justify-start items-center gap-[15px] inline-flex"> <div class="text-[#93C5FD] text-xl font-normal leading-7">Learn more</div> <img src="/services/agc.svg" alt="arrow"> </div> </div> <div class="flex-col items-start gap-5 inline-flex px-2 md:px-6 py-6 md:py-2"> <div class="w-full text-lg font-normal">For a B2B software company, we developed an SEO strategy that resulted in a first page ranking for key keywords and a 200% increase in organic traffic.</div> <div class="justify-start items-center gap-[15px] inline-flex"> <div class="text-[#93C5FD] text-xl font-normal leading-7">Learn more</div> <img src="/services/agc.svg" alt="arrow"> </div> </div> <div class="flex-col items-start gap-5 inline-flex px-2 md:px-6 py-6 md:py-2"> <div class="w-full text-lg font-normal">For a national retail chain, we created a social media marketing campaign that increased followers by 25% and generated a 20% increase in online sales.</div> <div class="justify-start items-center gap-[15px] inline-flex"> <div class="text-[#93C5FD] text-xl font-normal leading-7">Learn more</div> <img src="/services/agc.svg" alt="arrow"> </div> </div> </div> <!-- <div class="w-[186px] h-[0px] origin-top-left rotate-90 border border-white"></div> --> <!-- <div class="w-[186px] h-[0px] origin-top-left rotate-90 border border-white"></div> --> </div> ` })}`;
    }, "/home/abdi/Projects/Addition/Addition-Plus-Website/src/components/Case.astro", void 0);
    $$Astro4 = createAstro();
    $$Index2 = createComponent(($$result, $$props, $$slots) => {
      const Astro2 = $$result.createAstro($$Astro4, $$props, $$slots);
      Astro2.self = $$Index2;
      return renderTemplate`<!-- POSITIVUS Official Astro theme -->${renderComponent($$result, "Layout", $$Layout, { "title": "Positivus" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="space-y-20"> ${renderComponent($$result2, "Hero", $$Hero, {})} ${renderComponent($$result2, "Services", $$Services, {})} ${renderComponent($$result2, "Case", $$Case, {})} ${renderComponent($$result2, "Team", $$Team, {})} ${renderComponent($$result2, "Testimonial", $$Testimonial, {})} ${renderComponent($$result2, "Contact", $$Contact, {})} </main> ` })}`;
    }, "/home/abdi/Projects/Addition/Addition-Plus-Website/src/pages/index.astro", void 0);
    $$file5 = "/home/abdi/Projects/Addition/Addition-Plus-Website/src/pages/index.astro";
    $$url5 = "";
    _page7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
      __proto__: null,
      default: $$Index2,
      file: $$file5,
      url: $$url5
    }, Symbol.toStringTag, { value: "Module" }));
    page7 = /* @__PURE__ */ __name(() => _page7, "page");
  }
});

// .wrangler/tmp/bundle-up6FKb/middleware-loader.entry.ts
init_checked_fetch();
init_modules_watch_stub();

// .wrangler/tmp/bundle-up6FKb/middleware-insertion-facade.js
init_checked_fetch();
init_modules_watch_stub();

// dist/_worker.js/index.js
init_checked_fetch();
init_modules_watch_stub();
init_renderers();

// dist/_worker.js/chunks/_@astrojs-ssr-adapter_27AeEvWP.mjs
init_checked_fetch();
init_modules_watch_stub();
init_index_BnlZSNsy();
init_server_Den36nYv();
init_assets_service_B44g93js();

// dist/_worker.js/chunks/noop-middleware_bsN4OGXR.mjs
init_checked_fetch();
init_modules_watch_stub();
globalThis.process ??= {};
globalThis.process.env ??= {};
var NOOP_MIDDLEWARE_FN = /* @__PURE__ */ __name((_, next) => next(), "NOOP_MIDDLEWARE_FN");

// dist/_worker.js/chunks/_@astrojs-ssr-adapter_27AeEvWP.mjs
init_astro_designed_error_pages_BHdqSjjW();
globalThis.process ??= {};
globalThis.process.env ??= {};
function createI18nMiddleware(i18n, base, trailingSlash, format) {
  if (!i18n)
    return (_, next) => next();
  const payload = {
    ...i18n,
    trailingSlash,
    base,
    format,
    domains: {}
  };
  const _redirectToDefaultLocale = redirectToDefaultLocale(payload);
  const _noFoundForNonLocaleRoute = notFound(payload);
  const _requestHasLocale = requestHasLocale(payload.locales);
  const _redirectToFallback = redirectToFallback(payload);
  const prefixAlways = /* @__PURE__ */ __name((context) => {
    const url6 = context.url;
    if (url6.pathname === base + "/" || url6.pathname === base) {
      return _redirectToDefaultLocale(context);
    } else if (!_requestHasLocale(context)) {
      return _noFoundForNonLocaleRoute(context);
    }
    return void 0;
  }, "prefixAlways");
  const prefixOtherLocales = /* @__PURE__ */ __name((context, response) => {
    let pathnameContainsDefaultLocale = false;
    const url6 = context.url;
    for (const segment of url6.pathname.split("/")) {
      if (normalizeTheLocale(segment) === normalizeTheLocale(i18n.defaultLocale)) {
        pathnameContainsDefaultLocale = true;
        break;
      }
    }
    if (pathnameContainsDefaultLocale) {
      const newLocation = url6.pathname.replace(`/${i18n.defaultLocale}`, "");
      response.headers.set("Location", newLocation);
      return _noFoundForNonLocaleRoute(context);
    }
    return void 0;
  }, "prefixOtherLocales");
  return async (context, next) => {
    const response = await next();
    const type = response.headers.get(ROUTE_TYPE_HEADER);
    if (type !== "page" && type !== "fallback") {
      return response;
    }
    if (requestIs404Or500(context.request, base)) {
      return response;
    }
    const { currentLocale } = context;
    switch (i18n.strategy) {
      case "manual": {
        return response;
      }
      case "domains-prefix-other-locales": {
        if (localeHasntDomain(i18n, currentLocale)) {
          const result = prefixOtherLocales(context, response);
          if (result) {
            return result;
          }
        }
        break;
      }
      case "pathname-prefix-other-locales": {
        const result = prefixOtherLocales(context, response);
        if (result) {
          return result;
        }
        break;
      }
      case "domains-prefix-always-no-redirect": {
        if (localeHasntDomain(i18n, currentLocale)) {
          const result = _noFoundForNonLocaleRoute(context, response);
          if (result) {
            return result;
          }
        }
        break;
      }
      case "pathname-prefix-always-no-redirect": {
        const result = _noFoundForNonLocaleRoute(context, response);
        if (result) {
          return result;
        }
        break;
      }
      case "pathname-prefix-always": {
        const result = prefixAlways(context);
        if (result) {
          return result;
        }
        break;
      }
      case "domains-prefix-always": {
        if (localeHasntDomain(i18n, currentLocale)) {
          const result = prefixAlways(context);
          if (result) {
            return result;
          }
        }
        break;
      }
    }
    return _redirectToFallback(context, response);
  };
}
__name(createI18nMiddleware, "createI18nMiddleware");
function localeHasntDomain(i18n, currentLocale) {
  for (const domainLocale of Object.values(i18n.domainLookupTable)) {
    if (domainLocale === currentLocale) {
      return false;
    }
  }
  return true;
}
__name(localeHasntDomain, "localeHasntDomain");
var FORM_CONTENT_TYPES = [
  "application/x-www-form-urlencoded",
  "multipart/form-data",
  "text/plain"
];
function createOriginCheckMiddleware() {
  return defineMiddleware((context, next) => {
    const { request, url: url6 } = context;
    const contentType = request.headers.get("content-type");
    if (contentType) {
      if (FORM_CONTENT_TYPES.includes(contentType.toLowerCase())) {
        const forbidden = (request.method === "POST" || request.method === "PUT" || request.method === "PATCH" || request.method === "DELETE") && request.headers.get("origin") !== url6.origin;
        if (forbidden) {
          return new Response(`Cross-site ${request.method} form submissions are forbidden`, {
            status: 403
          });
        }
      }
    }
    return next();
  });
}
__name(createOriginCheckMiddleware, "createOriginCheckMiddleware");
function getPattern(segments, base, addTrailingSlash) {
  const pathname = segments.map((segment) => {
    if (segment.length === 1 && segment[0].spread) {
      return "(?:\\/(.*?))?";
    } else {
      return "\\/" + segment.map((part) => {
        if (part.spread) {
          return "(.*?)";
        } else if (part.dynamic) {
          return "([^/]+?)";
        } else {
          return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        }
      }).join("");
    }
  }).join("");
  const trailing = addTrailingSlash && segments.length ? getTrailingSlashPattern(addTrailingSlash) : "$";
  let initial = "\\/";
  if (addTrailingSlash === "never" && base !== "/") {
    initial = "";
  }
  return new RegExp(`^${pathname || initial}${trailing}`);
}
__name(getPattern, "getPattern");
function getTrailingSlashPattern(addTrailingSlash) {
  if (addTrailingSlash === "always") {
    return "\\/$";
  }
  if (addTrailingSlash === "never") {
    return "$";
  }
  return "\\/?$";
}
__name(getTrailingSlashPattern, "getTrailingSlashPattern");
var SERVER_ISLAND_ROUTE = "/_server-islands/[name]";
var SERVER_ISLAND_COMPONENT = "_server-islands.astro";
function getServerIslandRouteData(config) {
  const segments = [
    [{ content: "_server-islands", dynamic: false, spread: false }],
    [{ content: "name", dynamic: true, spread: false }]
  ];
  const route = {
    type: "page",
    component: SERVER_ISLAND_COMPONENT,
    generate: () => "",
    params: ["name"],
    segments,
    pattern: getPattern(segments, config.base, config.trailingSlash),
    prerender: false,
    isIndex: false,
    fallbackRoutes: [],
    route: SERVER_ISLAND_ROUTE
  };
  return route;
}
__name(getServerIslandRouteData, "getServerIslandRouteData");
function ensureServerIslandRoute(config, routeManifest) {
  if (routeManifest.routes.some((route) => route.route === "/_server-islands/[name]")) {
    return;
  }
  routeManifest.routes.unshift(getServerIslandRouteData(config));
}
__name(ensureServerIslandRoute, "ensureServerIslandRoute");
function createEndpoint(manifest2) {
  const page8 = /* @__PURE__ */ __name(async (result) => {
    const params = result.params;
    const request = result.request;
    const raw = await request.text();
    const data6 = JSON.parse(raw);
    if (!params.name) {
      return new Response(null, {
        status: 400,
        statusText: "Bad request"
      });
    }
    const componentId = params.name;
    const imp = manifest2.serverIslandMap?.get(componentId);
    if (!imp) {
      return new Response(null, {
        status: 404,
        statusText: "Not found"
      });
    }
    const key = await manifest2.key;
    const encryptedProps = data6.encryptedProps;
    const propString = await decryptString(key, encryptedProps);
    const props = JSON.parse(propString);
    const componentModule = await imp();
    const Component = componentModule[data6.componentExport];
    const slots = {};
    for (const prop in data6.slots) {
      slots[prop] = createSlotValueFromString(data6.slots[prop]);
    }
    return renderTemplate`${renderComponent(result, "Component", Component, props, slots)}`;
  }, "page");
  page8.isAstroComponentFactory = true;
  const instance = {
    default: page8,
    partial: true
  };
  return instance;
}
__name(createEndpoint, "createEndpoint");
function injectDefaultRoutes(ssrManifest, routeManifest) {
  ensure404Route(routeManifest);
  ensureServerIslandRoute(ssrManifest, routeManifest);
  return routeManifest;
}
__name(injectDefaultRoutes, "injectDefaultRoutes");
function createDefaultRoutes(manifest2) {
  const root = new URL(manifest2.hrefRoot);
  return [
    {
      instance: default404Instance,
      matchesComponent: (filePath) => filePath.href === new URL(DEFAULT_404_COMPONENT, root).href,
      route: DEFAULT_404_ROUTE.route,
      component: DEFAULT_404_COMPONENT
    },
    {
      instance: createEndpoint(manifest2),
      matchesComponent: (filePath) => filePath.href === new URL(SERVER_ISLAND_COMPONENT, root).href,
      route: SERVER_ISLAND_ROUTE,
      component: SERVER_ISLAND_COMPONENT
    }
  ];
}
__name(createDefaultRoutes, "createDefaultRoutes");
var Pipeline = class {
  constructor(logger, manifest2, mode, renderers2, resolve, serverLike, streaming, adapterName = manifest2.adapterName, clientDirectives = manifest2.clientDirectives, inlinedScripts = manifest2.inlinedScripts, compressHTML = manifest2.compressHTML, i18n = manifest2.i18n, middleware = manifest2.middleware, routeCache = new RouteCache(logger, mode), site = manifest2.site ? new URL(manifest2.site) : void 0, callSetGetEnv = true, defaultRoutes = createDefaultRoutes(manifest2)) {
    this.logger = logger;
    this.manifest = manifest2;
    this.mode = mode;
    this.renderers = renderers2;
    this.resolve = resolve;
    this.serverLike = serverLike;
    this.streaming = streaming;
    this.adapterName = adapterName;
    this.clientDirectives = clientDirectives;
    this.inlinedScripts = inlinedScripts;
    this.compressHTML = compressHTML;
    this.i18n = i18n;
    this.middleware = middleware;
    this.routeCache = routeCache;
    this.site = site;
    this.callSetGetEnv = callSetGetEnv;
    this.defaultRoutes = defaultRoutes;
    this.internalMiddleware = [];
    if (i18n?.strategy !== "manual") {
      this.internalMiddleware.push(
        createI18nMiddleware(i18n, manifest2.base, manifest2.trailingSlash, manifest2.buildFormat)
      );
    }
    if (callSetGetEnv && manifest2.experimentalEnvGetSecretEnabled)
      ;
  }
  internalMiddleware;
  resolvedMiddleware = void 0;
  /**
   * Resolves the middleware from the manifest, and returns the `onRequest` function. If `onRequest` isn't there,
   * it returns a no-op function
   */
  async getMiddleware() {
    if (this.resolvedMiddleware) {
      return this.resolvedMiddleware;
    } else if (this.middleware) {
      const middlewareInstance = await this.middleware();
      const onRequest2 = middlewareInstance.onRequest ?? NOOP_MIDDLEWARE_FN;
      if (this.manifest.checkOrigin) {
        this.resolvedMiddleware = sequence(createOriginCheckMiddleware(), onRequest2);
      } else {
        this.resolvedMiddleware = onRequest2;
      }
      return this.resolvedMiddleware;
    } else {
      this.resolvedMiddleware = NOOP_MIDDLEWARE_FN;
      return this.resolvedMiddleware;
    }
  }
};
__name(Pipeline, "Pipeline");
var RedirectComponentInstance = {
  default() {
    return new Response(null, {
      status: 301
    });
  }
};
var RedirectSinglePageBuiltModule = {
  page: () => Promise.resolve(RedirectComponentInstance),
  onRequest: (_, next) => next(),
  renderers: []
};
var dateTimeFormat = new Intl.DateTimeFormat([], {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false
});
var levels = {
  debug: 20,
  info: 30,
  warn: 40,
  error: 50,
  silent: 90
};
function log(opts, level, label, message, newLine = true) {
  const logLevel = opts.level;
  const dest = opts.dest;
  const event = {
    label,
    level,
    message,
    newLine
  };
  if (!isLogLevelEnabled(logLevel, level)) {
    return;
  }
  dest.write(event);
}
__name(log, "log");
function isLogLevelEnabled(configuredLogLevel, level) {
  return levels[configuredLogLevel] <= levels[level];
}
__name(isLogLevelEnabled, "isLogLevelEnabled");
function info(opts, label, message, newLine = true) {
  return log(opts, "info", label, message, newLine);
}
__name(info, "info");
function warn(opts, label, message, newLine = true) {
  return log(opts, "warn", label, message, newLine);
}
__name(warn, "warn");
function error(opts, label, message, newLine = true) {
  return log(opts, "error", label, message, newLine);
}
__name(error, "error");
function debug(...args) {
  if ("_astroGlobalDebug" in globalThis) {
    globalThis._astroGlobalDebug(...args);
  }
}
__name(debug, "debug");
function getEventPrefix({ level, label }) {
  const timestamp = `${dateTimeFormat.format(/* @__PURE__ */ new Date())}`;
  const prefix = [];
  if (level === "error" || level === "warn") {
    prefix.push(bold(timestamp));
    prefix.push(`[${level.toUpperCase()}]`);
  } else {
    prefix.push(timestamp);
  }
  if (label) {
    prefix.push(`[${label}]`);
  }
  if (level === "error") {
    return red(prefix.join(" "));
  }
  if (level === "warn") {
    return yellow(prefix.join(" "));
  }
  if (prefix.length === 1) {
    return dim(prefix[0]);
  }
  return dim(prefix[0]) + " " + blue(prefix.splice(1).join(" "));
}
__name(getEventPrefix, "getEventPrefix");
var Logger = class {
  options;
  constructor(options) {
    this.options = options;
  }
  info(label, message, newLine = true) {
    info(this.options, label, message, newLine);
  }
  warn(label, message, newLine = true) {
    warn(this.options, label, message, newLine);
  }
  error(label, message, newLine = true) {
    error(this.options, label, message, newLine);
  }
  debug(label, ...messages) {
    debug(label, ...messages);
  }
  level() {
    return this.options.level;
  }
  forkIntegrationLogger(label) {
    return new AstroIntegrationLogger(this.options, label);
  }
};
__name(Logger, "Logger");
var AstroIntegrationLogger = class {
  options;
  label;
  constructor(logging, label) {
    this.options = logging;
    this.label = label;
  }
  /**
   * Creates a new logger instance with a new label, but the same log options.
   */
  fork(label) {
    return new AstroIntegrationLogger(this.options, label);
  }
  info(message) {
    info(this.options, this.label, message);
  }
  warn(message) {
    warn(this.options, this.label, message);
  }
  error(message) {
    error(this.options, this.label, message);
  }
  debug(message) {
    debug(this.label, message);
  }
};
__name(AstroIntegrationLogger, "AstroIntegrationLogger");
var consoleLogDestination = {
  write(event) {
    let dest = console.error;
    if (levels[event.level] < levels["error"]) {
      dest = console.log;
    }
    if (event.label === "SKIP_FORMAT") {
      dest(event.message);
    } else {
      dest(getEventPrefix(event) + " " + event.message);
    }
    return true;
  }
};
function getAssetsPrefix(fileExtension2, assetsPrefix) {
  if (!assetsPrefix)
    return "";
  if (typeof assetsPrefix === "string")
    return assetsPrefix;
  const dotLessFileExtension = fileExtension2.slice(1);
  if (assetsPrefix[dotLessFileExtension]) {
    return assetsPrefix[dotLessFileExtension];
  }
  return assetsPrefix.fallback;
}
__name(getAssetsPrefix, "getAssetsPrefix");
function createAssetLink(href, base, assetsPrefix) {
  if (assetsPrefix) {
    const pf = getAssetsPrefix(fileExtension(href), assetsPrefix);
    return joinPaths(pf, slash(href));
  } else if (base) {
    return prependForwardSlash(joinPaths(base, slash(href)));
  } else {
    return href;
  }
}
__name(createAssetLink, "createAssetLink");
function createStylesheetElement(stylesheet, base, assetsPrefix) {
  if (stylesheet.type === "inline") {
    return {
      props: {},
      children: stylesheet.content
    };
  } else {
    return {
      props: {
        rel: "stylesheet",
        href: createAssetLink(stylesheet.src, base, assetsPrefix)
      },
      children: ""
    };
  }
}
__name(createStylesheetElement, "createStylesheetElement");
function createStylesheetElementSet(stylesheets, base, assetsPrefix) {
  return new Set(stylesheets.map((s2) => createStylesheetElement(s2, base, assetsPrefix)));
}
__name(createStylesheetElementSet, "createStylesheetElementSet");
function createModuleScriptElement(script, base, assetsPrefix) {
  if (script.type === "external") {
    return createModuleScriptElementWithSrc(script.value, base, assetsPrefix);
  } else {
    return {
      props: {
        type: "module"
      },
      children: script.value
    };
  }
}
__name(createModuleScriptElement, "createModuleScriptElement");
function createModuleScriptElementWithSrc(src, base, assetsPrefix) {
  return {
    props: {
      type: "module",
      src: createAssetLink(src, base, assetsPrefix)
    },
    children: ""
  };
}
__name(createModuleScriptElementWithSrc, "createModuleScriptElementWithSrc");
function matchRoute(pathname, manifest2) {
  const decodedPathname = decodeURI(pathname);
  return manifest2.routes.find((route) => {
    return route.pattern.test(decodedPathname) || route.fallbackRoutes.some((fallbackRoute) => fallbackRoute.pattern.test(decodedPathname));
  });
}
__name(matchRoute, "matchRoute");
var AppPipeline = class extends Pipeline {
  #manifestData;
  static create(manifestData, {
    logger,
    manifest: manifest2,
    mode,
    renderers: renderers2,
    resolve,
    serverLike,
    streaming,
    defaultRoutes
  }) {
    const pipeline = new AppPipeline(
      logger,
      manifest2,
      mode,
      renderers2,
      resolve,
      serverLike,
      streaming,
      void 0,
      void 0,
      void 0,
      void 0,
      void 0,
      void 0,
      void 0,
      void 0,
      false,
      defaultRoutes
    );
    pipeline.#manifestData = manifestData;
    return pipeline;
  }
  headElements(routeData) {
    const routeInfo = this.manifest.routes.find((route) => route.routeData === routeData);
    const links = /* @__PURE__ */ new Set();
    const scripts = /* @__PURE__ */ new Set();
    const styles = createStylesheetElementSet(routeInfo?.styles ?? []);
    for (const script of routeInfo?.scripts ?? []) {
      if ("stage" in script) {
        if (script.stage === "head-inline") {
          scripts.add({
            props: {},
            children: script.children
          });
        }
      } else {
        scripts.add(createModuleScriptElement(script));
      }
    }
    return { links, styles, scripts };
  }
  componentMetadata() {
  }
  async getComponentByRoute(routeData) {
    const module = await this.getModuleForRoute(routeData);
    return module.page();
  }
  async tryRewrite(payload, request) {
    const { newUrl, pathname, routeData } = findRouteToRewrite({
      payload,
      request,
      routes: this.manifest?.routes.map((r3) => r3.routeData),
      trailingSlash: this.manifest.trailingSlash,
      buildFormat: this.manifest.buildFormat,
      base: this.manifest.base
    });
    const componentInstance = await this.getComponentByRoute(routeData);
    return { newUrl, pathname, componentInstance, routeData };
  }
  async getModuleForRoute(route) {
    for (const defaultRoute of this.defaultRoutes) {
      if (route.component === defaultRoute.component) {
        return {
          page: () => Promise.resolve(defaultRoute.instance),
          renderers: []
        };
      }
    }
    if (route.type === "redirect") {
      return RedirectSinglePageBuiltModule;
    } else {
      if (this.manifest.pageMap) {
        const importComponentInstance = this.manifest.pageMap.get(route.component);
        if (!importComponentInstance) {
          throw new Error(
            `Unexpectedly unable to find a component instance for route ${route.route}`
          );
        }
        return await importComponentInstance();
      } else if (this.manifest.pageModule) {
        return this.manifest.pageModule;
      }
      throw new Error(
        "Astro couldn't find the correct page to render, probably because it wasn't correctly mapped for SSR usage. This is an internal error, please file an issue."
      );
    }
  }
};
__name(AppPipeline, "AppPipeline");
var _manifest, _manifestData, _logger, _baseWithoutTrailingSlash, _pipeline, _adapterLogger, _renderOptionsDeprecationWarningShown, _createPipeline, createPipeline_fn, _getPathnameFromRequest, getPathnameFromRequest_fn, _computePathnameFromDomain, computePathnameFromDomain_fn, _logRenderOptionsDeprecationWarning, logRenderOptionsDeprecationWarning_fn, _renderError, renderError_fn, _mergeResponses, mergeResponses_fn, _getDefaultStatusCode, getDefaultStatusCode_fn;
var _App = class {
  constructor(manifest2, streaming = true) {
    /**
     * Creates a pipeline by reading the stored manifest
     *
     * @param manifestData
     * @param streaming
     * @private
     */
    __privateAdd(this, _createPipeline);
    __privateAdd(this, _getPathnameFromRequest);
    __privateAdd(this, _computePathnameFromDomain);
    __privateAdd(this, _logRenderOptionsDeprecationWarning);
    /**
     * If it is a known error code, try sending the according page (e.g. 404.astro / 500.astro).
     * This also handles pre-rendered /404 or /500 routes
     */
    __privateAdd(this, _renderError);
    __privateAdd(this, _mergeResponses);
    __privateAdd(this, _getDefaultStatusCode);
    __privateAdd(this, _manifest, void 0);
    __privateAdd(this, _manifestData, void 0);
    __privateAdd(this, _logger, new Logger({
      dest: consoleLogDestination,
      level: "info"
    }));
    __privateAdd(this, _baseWithoutTrailingSlash, void 0);
    __privateAdd(this, _pipeline, void 0);
    __privateAdd(this, _adapterLogger, void 0);
    __privateAdd(this, _renderOptionsDeprecationWarningShown, false);
    __privateSet(this, _manifest, manifest2);
    __privateSet(this, _manifestData, injectDefaultRoutes(manifest2, {
      routes: manifest2.routes.map((route) => route.routeData)
    }));
    __privateSet(this, _baseWithoutTrailingSlash, removeTrailingForwardSlash(__privateGet(this, _manifest).base));
    __privateSet(this, _pipeline, __privateMethod(this, _createPipeline, createPipeline_fn).call(this, __privateGet(this, _manifestData), streaming));
    __privateSet(this, _adapterLogger, new AstroIntegrationLogger(
      __privateGet(this, _logger).options,
      __privateGet(this, _manifest).adapterName
    ));
  }
  getAdapterLogger() {
    return __privateGet(this, _adapterLogger);
  }
  set setManifestData(newManifestData) {
    __privateSet(this, _manifestData, newManifestData);
  }
  removeBase(pathname) {
    if (pathname.startsWith(__privateGet(this, _manifest).base)) {
      return pathname.slice(__privateGet(this, _baseWithoutTrailingSlash).length + 1);
    }
    return pathname;
  }
  match(request) {
    const url6 = new URL(request.url);
    if (__privateGet(this, _manifest).assets.has(url6.pathname))
      return void 0;
    let pathname = __privateMethod(this, _computePathnameFromDomain, computePathnameFromDomain_fn).call(this, request);
    if (!pathname) {
      pathname = prependForwardSlash(this.removeBase(url6.pathname));
    }
    let routeData = matchRoute(pathname, __privateGet(this, _manifestData));
    if (!routeData || routeData.prerender)
      return void 0;
    return routeData;
  }
  async render(request, routeDataOrOptions, maybeLocals) {
    let routeData;
    let locals;
    let clientAddress;
    let addCookieHeader;
    if (routeDataOrOptions && ("addCookieHeader" in routeDataOrOptions || "clientAddress" in routeDataOrOptions || "locals" in routeDataOrOptions || "routeData" in routeDataOrOptions)) {
      if ("addCookieHeader" in routeDataOrOptions) {
        addCookieHeader = routeDataOrOptions.addCookieHeader;
      }
      if ("clientAddress" in routeDataOrOptions) {
        clientAddress = routeDataOrOptions.clientAddress;
      }
      if ("routeData" in routeDataOrOptions) {
        routeData = routeDataOrOptions.routeData;
      }
      if ("locals" in routeDataOrOptions) {
        locals = routeDataOrOptions.locals;
      }
    } else {
      routeData = routeDataOrOptions;
      locals = maybeLocals;
      if (routeDataOrOptions || locals) {
        __privateMethod(this, _logRenderOptionsDeprecationWarning, logRenderOptionsDeprecationWarning_fn).call(this);
      }
    }
    if (routeData) {
      __privateGet(this, _logger).debug(
        "router",
        "The adapter " + __privateGet(this, _manifest).adapterName + " provided a custom RouteData for ",
        request.url
      );
      __privateGet(this, _logger).debug("router", "RouteData:\n" + routeData);
    }
    if (locals) {
      if (typeof locals !== "object") {
        const error2 = new AstroError(LocalsNotAnObject);
        __privateGet(this, _logger).error(null, error2.stack);
        return __privateMethod(this, _renderError, renderError_fn).call(this, request, { status: 500, error: error2 });
      }
      Reflect.set(request, clientLocalsSymbol, locals);
    }
    if (clientAddress) {
      Reflect.set(request, clientAddressSymbol, clientAddress);
    }
    if (!routeData) {
      routeData = this.match(request);
      __privateGet(this, _logger).debug("router", "Astro matched the following route for " + request.url);
      __privateGet(this, _logger).debug("router", "RouteData:\n" + routeData);
    }
    if (!routeData) {
      __privateGet(this, _logger).debug("router", "Astro hasn't found routes that match " + request.url);
      __privateGet(this, _logger).debug("router", "Here's the available routes:\n", __privateGet(this, _manifestData));
      return __privateMethod(this, _renderError, renderError_fn).call(this, request, { locals, status: 404 });
    }
    const pathname = __privateMethod(this, _getPathnameFromRequest, getPathnameFromRequest_fn).call(this, request);
    const defaultStatus = __privateMethod(this, _getDefaultStatusCode, getDefaultStatusCode_fn).call(this, routeData, pathname);
    let response;
    try {
      const mod = await __privateGet(this, _pipeline).getModuleForRoute(routeData);
      const renderContext = await RenderContext.create({
        pipeline: __privateGet(this, _pipeline),
        locals,
        pathname,
        request,
        routeData,
        status: defaultStatus
      });
      response = await renderContext.render(await mod.page());
    } catch (err) {
      __privateGet(this, _logger).error(null, err.stack || err.message || String(err));
      return __privateMethod(this, _renderError, renderError_fn).call(this, request, { locals, status: 500, error: err });
    }
    if (REROUTABLE_STATUS_CODES.includes(response.status) && response.headers.get(REROUTE_DIRECTIVE_HEADER) !== "no") {
      return __privateMethod(this, _renderError, renderError_fn).call(this, request, {
        locals,
        response,
        status: response.status,
        // We don't have an error to report here. Passing null means we pass nothing intentionally
        // while undefined means there's no error
        error: response.status === 500 ? null : void 0
      });
    }
    if (response.headers.has(REROUTE_DIRECTIVE_HEADER)) {
      response.headers.delete(REROUTE_DIRECTIVE_HEADER);
    }
    if (addCookieHeader) {
      for (const setCookieHeaderValue of _App.getSetCookieFromResponse(response)) {
        response.headers.append("set-cookie", setCookieHeaderValue);
      }
    }
    Reflect.set(response, responseSentSymbol, true);
    return response;
  }
  setCookieHeaders(response) {
    return getSetCookiesFromResponse(response);
  }
};
var App = _App;
__name(App, "App");
_manifest = new WeakMap();
_manifestData = new WeakMap();
_logger = new WeakMap();
_baseWithoutTrailingSlash = new WeakMap();
_pipeline = new WeakMap();
_adapterLogger = new WeakMap();
_renderOptionsDeprecationWarningShown = new WeakMap();
_createPipeline = new WeakSet();
createPipeline_fn = /* @__PURE__ */ __name(function(manifestData, streaming = false) {
  return AppPipeline.create(manifestData, {
    logger: __privateGet(this, _logger),
    manifest: __privateGet(this, _manifest),
    mode: "production",
    renderers: __privateGet(this, _manifest).renderers,
    defaultRoutes: createDefaultRoutes(__privateGet(this, _manifest)),
    resolve: async (specifier) => {
      if (!(specifier in __privateGet(this, _manifest).entryModules)) {
        throw new Error(`Unable to resolve [${specifier}]`);
      }
      const bundlePath = __privateGet(this, _manifest).entryModules[specifier];
      switch (true) {
        case bundlePath.startsWith("data:"):
        case bundlePath.length === 0: {
          return bundlePath;
        }
        default: {
          return createAssetLink(bundlePath, __privateGet(this, _manifest).base, __privateGet(this, _manifest).assetsPrefix);
        }
      }
    },
    serverLike: true,
    streaming
  });
}, "#createPipeline");
_getPathnameFromRequest = new WeakSet();
getPathnameFromRequest_fn = /* @__PURE__ */ __name(function(request) {
  const url6 = new URL(request.url);
  const pathname = prependForwardSlash(this.removeBase(url6.pathname));
  return pathname;
}, "#getPathnameFromRequest");
_computePathnameFromDomain = new WeakSet();
computePathnameFromDomain_fn = /* @__PURE__ */ __name(function(request) {
  let pathname = void 0;
  const url6 = new URL(request.url);
  if (__privateGet(this, _manifest).i18n && (__privateGet(this, _manifest).i18n.strategy === "domains-prefix-always" || __privateGet(this, _manifest).i18n.strategy === "domains-prefix-other-locales" || __privateGet(this, _manifest).i18n.strategy === "domains-prefix-always-no-redirect")) {
    let host = request.headers.get("X-Forwarded-Host");
    let protocol = request.headers.get("X-Forwarded-Proto");
    if (protocol) {
      protocol = protocol + ":";
    } else {
      protocol = url6.protocol;
    }
    if (!host) {
      host = request.headers.get("Host");
    }
    if (host && protocol) {
      host = host.split(":")[0];
      try {
        let locale;
        const hostAsUrl = new URL(`${protocol}//${host}`);
        for (const [domainKey, localeValue] of Object.entries(
          __privateGet(this, _manifest).i18n.domainLookupTable
        )) {
          const domainKeyAsUrl = new URL(domainKey);
          if (hostAsUrl.host === domainKeyAsUrl.host && hostAsUrl.protocol === domainKeyAsUrl.protocol) {
            locale = localeValue;
            break;
          }
        }
        if (locale) {
          pathname = prependForwardSlash(
            joinPaths(normalizeTheLocale(locale), this.removeBase(url6.pathname))
          );
          if (url6.pathname.endsWith("/")) {
            pathname = appendForwardSlash(pathname);
          }
        }
      } catch (e2) {
        __privateGet(this, _logger).error(
          "router",
          `Astro tried to parse ${protocol}//${host} as an URL, but it threw a parsing error. Check the X-Forwarded-Host and X-Forwarded-Proto headers.`
        );
        __privateGet(this, _logger).error("router", `Error: ${e2}`);
      }
    }
  }
  return pathname;
}, "#computePathnameFromDomain");
_logRenderOptionsDeprecationWarning = new WeakSet();
logRenderOptionsDeprecationWarning_fn = /* @__PURE__ */ __name(function() {
  if (__privateGet(this, _renderOptionsDeprecationWarningShown))
    return;
  __privateGet(this, _logger).warn(
    "deprecated",
    `The adapter ${__privateGet(this, _manifest).adapterName} is using a deprecated signature of the 'app.render()' method. From Astro 4.0, locals and routeData are provided as properties on an optional object to this method. Using the old signature will cause an error in Astro 5.0. See https://github.com/withastro/astro/pull/9199 for more information.`
  );
  __privateSet(this, _renderOptionsDeprecationWarningShown, true);
}, "#logRenderOptionsDeprecationWarning");
_renderError = new WeakSet();
renderError_fn = /* @__PURE__ */ __name(async function(request, {
  locals,
  status,
  response: originalResponse,
  skipMiddleware = false,
  error: error2
}) {
  const errorRoutePath = `/${status}${__privateGet(this, _manifest).trailingSlash === "always" ? "/" : ""}`;
  const errorRouteData = matchRoute(errorRoutePath, __privateGet(this, _manifestData));
  const url6 = new URL(request.url);
  if (errorRouteData) {
    if (errorRouteData.prerender) {
      const maybeDotHtml = errorRouteData.route.endsWith(`/${status}`) ? ".html" : "";
      const statusURL = new URL(
        `${__privateGet(this, _baseWithoutTrailingSlash)}/${status}${maybeDotHtml}`,
        url6
      );
      if (statusURL.toString() !== request.url) {
        const response2 = await fetch(statusURL.toString());
        const override = { status };
        return __privateMethod(this, _mergeResponses, mergeResponses_fn).call(this, response2, originalResponse, override);
      }
    }
    const mod = await __privateGet(this, _pipeline).getModuleForRoute(errorRouteData);
    try {
      const renderContext = await RenderContext.create({
        locals,
        pipeline: __privateGet(this, _pipeline),
        middleware: skipMiddleware ? NOOP_MIDDLEWARE_FN : void 0,
        pathname: __privateMethod(this, _getPathnameFromRequest, getPathnameFromRequest_fn).call(this, request),
        request,
        routeData: errorRouteData,
        status,
        props: { error: error2 }
      });
      const response2 = await renderContext.render(await mod.page());
      return __privateMethod(this, _mergeResponses, mergeResponses_fn).call(this, response2, originalResponse);
    } catch {
      if (skipMiddleware === false) {
        return __privateMethod(this, _renderError, renderError_fn).call(this, request, {
          locals,
          status,
          response: originalResponse,
          skipMiddleware: true
        });
      }
    }
  }
  const response = __privateMethod(this, _mergeResponses, mergeResponses_fn).call(this, new Response(null, { status }), originalResponse);
  Reflect.set(response, responseSentSymbol, true);
  return response;
}, "#renderError");
_mergeResponses = new WeakSet();
mergeResponses_fn = /* @__PURE__ */ __name(function(newResponse, originalResponse, override) {
  if (!originalResponse) {
    if (override !== void 0) {
      return new Response(newResponse.body, {
        status: override.status,
        statusText: newResponse.statusText,
        headers: newResponse.headers
      });
    }
    return newResponse;
  }
  const status = override?.status ? override.status : originalResponse.status === 200 ? newResponse.status : originalResponse.status;
  try {
    originalResponse.headers.delete("Content-type");
  } catch {
  }
  return new Response(newResponse.body, {
    status,
    statusText: status === 200 ? newResponse.statusText : originalResponse.statusText,
    // If you're looking at here for possible bugs, it means that it's not a bug.
    // With the middleware, users can meddle with headers, and we should pass to the 404/500.
    // If users see something weird, it's because they are setting some headers they should not.
    //
    // Although, we don't want it to replace the content-type, because the error page must return `text/html`
    headers: new Headers([
      ...Array.from(newResponse.headers),
      ...Array.from(originalResponse.headers)
    ])
  });
}, "#mergeResponses");
_getDefaultStatusCode = new WeakSet();
getDefaultStatusCode_fn = /* @__PURE__ */ __name(function(routeData, pathname) {
  if (!routeData.pattern.test(pathname)) {
    for (const fallbackRoute of routeData.fallbackRoutes) {
      if (fallbackRoute.pattern.test(pathname)) {
        return 302;
      }
    }
  }
  const route = removeTrailingForwardSlash(routeData.route);
  if (route.endsWith("/404"))
    return 404;
  if (route.endsWith("/500"))
    return 500;
  return 200;
}, "#getDefaultStatusCode");
/**
 * Reads all the cookies written by `Astro.cookie.set()` onto the passed response.
 * For example,
 * ```ts
 * for (const cookie_ of App.getSetCookieFromResponse(response)) {
 *     const cookie: string = cookie_
 * }
 * ```
 * @param response The response to read cookies from.
 * @returns An iterator that yields key-value pairs as equal-sign-separated strings.
 */
__publicField(App, "getSetCookieFromResponse", getSetCookiesFromResponse);
function createExports(manifest2) {
  const app = new App(manifest2);
  const fetch2 = /* @__PURE__ */ __name(async (request, env, context) => {
    const { pathname } = new URL(request.url);
    if (manifest2.assets.has(pathname)) {
      return env.ASSETS.fetch(request.url.replace(/\.html$/, ""));
    }
    const routeData = app.match(request);
    if (!routeData) {
      const asset = await env.ASSETS.fetch(request.url.replace(/index.html$/, "").replace(/\.html$/, ""));
      if (asset.status !== 404) {
        return asset;
      }
    }
    Reflect.set(request, Symbol.for("astro.clientAddress"), request.headers.get("cf-connecting-ip"));
    process.env.ASTRO_STUDIO_APP_TOKEN ??= (() => {
      if (typeof env.ASTRO_STUDIO_APP_TOKEN === "string") {
        return env.ASTRO_STUDIO_APP_TOKEN;
      }
    })();
    const locals = {
      runtime: {
        env,
        cf: request.cf,
        caches,
        ctx: {
          waitUntil: (promise) => context.waitUntil(promise),
          // Currently not available: https://developers.cloudflare.com/pages/platform/known-issues/#pages-functions
          passThroughOnException: () => {
            throw new Error("`passThroughOnException` is currently not available in Cloudflare Pages. See https://developers.cloudflare.com/pages/platform/known-issues/#pages-functions.");
          }
        }
      }
    };
    const response = await app.render(request, { routeData, locals });
    if (app.setCookieHeaders) {
      for (const setCookieHeader of app.setCookieHeaders(response)) {
        response.headers.append("Set-Cookie", setCookieHeader);
      }
    }
    return response;
  }, "fetch");
  return { default: { fetch: fetch2 } };
}
__name(createExports, "createExports");
var serverEntrypointModule = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  createExports
}, Symbol.toStringTag, { value: "Module" }));

// dist/_worker.js/manifest_DMYQWFGC.mjs
init_checked_fetch();
init_modules_watch_stub();
init_server_Den36nYv();
init_astro_designed_error_pages_BHdqSjjW();
globalThis.process ??= {};
globalThis.process.env ??= {};
function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
__name(sanitizeParams, "sanitizeParams");
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
__name(getParameter, "getParameter");
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
__name(getSegment, "getSegment");
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}
__name(getRouteGenerator, "getRouteGenerator");
function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex
  };
}
__name(deserializeRouteData, "deserializeRouteData");
function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}
__name(deserializeManifest, "deserializeManifest");
var manifest = deserializeManifest({ "hrefRoot": "file:///home/abdi/Projects/Addition/Addition-Plus-Website/", "adapterName": "@astrojs/cloudflare", "routes": [{ "file": "", "links": [], "scripts": [], "styles": [], "routeData": { "type": "endpoint", "isIndex": false, "route": "/_image", "pattern": "^\\/_image$", "segments": [[{ "content": "_image", "dynamic": false, "spread": false }]], "params": [], "component": "node_modules/@astrojs/cloudflare/dist/entrypoints/image-endpoint.js", "pathname": "/_image", "prerender": false, "fallbackRoutes": [], "_meta": { "trailingSlash": "ignore" } } }, { "file": "", "links": [], "scripts": [{ "type": "external", "value": "/astro/hoisted.2daoxv0f.js" }], "styles": [{ "type": "external", "src": "/astro/about.BIM-xzWy.css" }], "routeData": { "route": "/404", "isIndex": false, "type": "page", "pattern": "^\\/404\\/?$", "segments": [[{ "content": "404", "dynamic": false, "spread": false }]], "params": [], "component": "src/pages/404.astro", "pathname": "/404", "prerender": false, "fallbackRoutes": [], "_meta": { "trailingSlash": "ignore" } } }, { "file": "", "links": [], "scripts": [{ "type": "external", "value": "/astro/hoisted.2daoxv0f.js" }], "styles": [{ "type": "external", "src": "/astro/about.BIM-xzWy.css" }], "routeData": { "route": "/about", "isIndex": false, "type": "page", "pattern": "^\\/about\\/?$", "segments": [[{ "content": "about", "dynamic": false, "spread": false }]], "params": [], "component": "src/pages/about.astro", "pathname": "/about", "prerender": false, "fallbackRoutes": [], "_meta": { "trailingSlash": "ignore" } } }, { "file": "", "links": [], "scripts": [], "styles": [], "routeData": { "route": "/articles/api/search.json", "isIndex": false, "type": "endpoint", "pattern": "^\\/articles\\/api\\/search\\.json\\/?$", "segments": [[{ "content": "articles", "dynamic": false, "spread": false }], [{ "content": "api", "dynamic": false, "spread": false }], [{ "content": "search.json", "dynamic": false, "spread": false }]], "params": [], "component": "src/pages/articles/api/search.json.ts", "pathname": "/articles/api/search.json", "prerender": false, "fallbackRoutes": [], "_meta": { "trailingSlash": "ignore" } } }, { "file": "", "links": [], "scripts": [{ "type": "external", "value": "/astro/hoisted.2daoxv0f.js" }], "styles": [{ "type": "external", "src": "/astro/about.BIM-xzWy.css" }], "routeData": { "route": "/articles", "isIndex": true, "type": "page", "pattern": "^\\/articles\\/?$", "segments": [[{ "content": "articles", "dynamic": false, "spread": false }]], "params": [], "component": "src/pages/articles/index.astro", "pathname": "/articles", "prerender": false, "fallbackRoutes": [], "_meta": { "trailingSlash": "ignore" } } }, { "file": "", "links": [], "scripts": [{ "type": "external", "value": "/astro/hoisted.2daoxv0f.js" }], "styles": [{ "type": "external", "src": "/astro/about.BIM-xzWy.css" }], "routeData": { "route": "/articles/[...slug]", "isIndex": false, "type": "page", "pattern": "^\\/articles(?:\\/(.*?))?\\/?$", "segments": [[{ "content": "articles", "dynamic": false, "spread": false }], [{ "content": "...slug", "dynamic": true, "spread": true }]], "params": ["...slug"], "component": "src/pages/articles/[...slug].astro", "prerender": false, "fallbackRoutes": [], "_meta": { "trailingSlash": "ignore" } } }, { "file": "", "links": [], "scripts": [{ "type": "external", "value": "/astro/hoisted.CZT4u22o.js" }], "styles": [{ "type": "external", "src": "/astro/hoisted.BwXjGcf2.css" }, { "type": "external", "src": "/astro/about.BIM-xzWy.css" }, { "type": "inline", "content": '.bubble[data-astro-cid-g42mys5r]{position:relative;padding:8%;background-color:#000;color:#fff;border-radius:45px;border:1px solid #B9FF66}.bubble[data-astro-cid-g42mys5r]:after{content:"";position:absolute;bottom:-20px;left:50px;border-width:22px;border-style:solid;border-color:black transparent transparent black}.bubble[data-astro-cid-g42mys5r]:before{content:"";position:absolute;bottom:-40px;left:48px;border-width:20px;border-style:solid;border-color:#B9FF66 transparent transparent #B9FF66}.swiper-wrapper[data-astro-cid-g42mys5r]{position:relative}.swiper-slide[data-astro-cid-g42mys5r]{display:flex;align-items:center;justify-content:center;transition:all .5s ease-in-out}.swiper-pagination[data-astro-cid-g42mys5r]{display:flex;align-items:center;width:auto!important;position:static!important}\n' }], "routeData": { "route": "/", "isIndex": true, "type": "page", "pattern": "^\\/$", "segments": [], "params": [], "component": "src/pages/index.astro", "pathname": "/", "prerender": false, "fallbackRoutes": [], "_meta": { "trailingSlash": "ignore" } } }], "base": "/", "trailingSlash": "ignore", "compressHTML": true, "componentMetadata": [["\0astro:content", { "propagation": "in-tree", "containsHead": false }], ["/home/abdi/Projects/Addition/Addition-Plus-Website/src/pages/articles/[...slug].astro", { "propagation": "in-tree", "containsHead": true }], ["\0@astro-page:src/pages/articles/[...slug]@_@astro", { "propagation": "in-tree", "containsHead": false }], ["\0@astrojs-ssr-virtual-entry", { "propagation": "in-tree", "containsHead": false }], ["/home/abdi/Projects/Addition/Addition-Plus-Website/src/pages/articles/api/search.json.ts", { "propagation": "in-tree", "containsHead": false }], ["\0@astro-page:src/pages/articles/api/search.json@_@ts", { "propagation": "in-tree", "containsHead": false }], ["/home/abdi/Projects/Addition/Addition-Plus-Website/src/pages/articles/index.astro", { "propagation": "in-tree", "containsHead": true }], ["\0@astro-page:src/pages/articles/index@_@astro", { "propagation": "in-tree", "containsHead": false }], ["/home/abdi/Projects/Addition/Addition-Plus-Website/src/pages/404.astro", { "propagation": "none", "containsHead": true }], ["/home/abdi/Projects/Addition/Addition-Plus-Website/src/pages/about.astro", { "propagation": "none", "containsHead": true }], ["/home/abdi/Projects/Addition/Addition-Plus-Website/src/pages/index.astro", { "propagation": "none", "containsHead": true }]], "renderers": [], "clientDirectives": [["idle", '(()=>{var l=(o,t)=>{let i=async()=>{await(await o())()},e=typeof t.value=="object"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};"requestIdleCallback"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event("astro:idle"));})();'], ["load", '(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event("astro:load"));})();'], ["media", '(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener("change",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event("astro:media"));})();'], ["only", '(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event("astro:only"));})();'], ["visible", '(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value=="object"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event("astro:visible"));})();']], "entryModules": { "\0astro-internal:middleware": "_astro-internal_middleware.mjs", "\0@astro-page:node_modules/@astrojs/cloudflare/dist/entrypoints/image-endpoint@_@js": "pages/_image.astro.mjs", "\0@astro-page:src/pages/404@_@astro": "pages/404.astro.mjs", "\0@astro-page:src/pages/about@_@astro": "pages/about.astro.mjs", "\0@astro-page:src/pages/articles/api/search.json@_@ts": "pages/articles/api/search.json.astro.mjs", "\0@astro-page:src/pages/articles/index@_@astro": "pages/articles.astro.mjs", "\0@astro-page:src/pages/articles/[...slug]@_@astro": "pages/articles/_---slug_.astro.mjs", "\0@astro-page:src/pages/index@_@astro": "pages/index.astro.mjs", "\0@astrojs-ssr-virtual-entry": "index.js", "\0@astro-renderers": "renderers.mjs", "\0@astrojs-ssr-adapter": "_@astrojs-ssr-adapter.mjs", "\0@astrojs-manifest": "manifest_DMYQWFGC.mjs", "/home/abdi/Projects/Addition/Addition-Plus-Website/src/content/blog/How to quickly deploy a static website.md?astroContentCollectionEntry=true": "chunks/How to quickly deploy a static website_D5tqu43_.mjs", "/home/abdi/Projects/Addition/Addition-Plus-Website/src/content/blog/cannon-excellence.md?astroContentCollectionEntry=true": "chunks/cannon-excellence_BOiohCMI.mjs", "/home/abdi/Projects/Addition/Addition-Plus-Website/src/content/blog/cutting-edge-tablets.md?astroContentCollectionEntry=true": "chunks/cutting-edge-tablets_CDLNkaVM.mjs", "/home/abdi/Projects/Addition/Addition-Plus-Website/src/content/blog/elevate-your-mobile-experience.md?astroContentCollectionEntry=true": "chunks/elevate-your-mobile-experience_C9ooJEK7.mjs", "/home/abdi/Projects/Addition/Addition-Plus-Website/src/content/blog/guardian-of-the-digital-realm.md?astroContentCollectionEntry=true": "chunks/guardian-of-the-digital-realm_BZNTAlFU.mjs", "/home/abdi/Projects/Addition/Addition-Plus-Website/src/content/blog/How to quickly deploy a static website.md?astroPropagatedAssets": "chunks/How to quickly deploy a static website_DQuK3059.mjs", "/home/abdi/Projects/Addition/Addition-Plus-Website/src/content/blog/cannon-excellence.md?astroPropagatedAssets": "chunks/cannon-excellence_tSsv6KYc.mjs", "/home/abdi/Projects/Addition/Addition-Plus-Website/src/content/blog/cutting-edge-tablets.md?astroPropagatedAssets": "chunks/cutting-edge-tablets_BY8xOBbU.mjs", "/home/abdi/Projects/Addition/Addition-Plus-Website/src/content/blog/elevate-your-mobile-experience.md?astroPropagatedAssets": "chunks/elevate-your-mobile-experience_BP2ZP5B2.mjs", "/home/abdi/Projects/Addition/Addition-Plus-Website/src/content/blog/guardian-of-the-digital-realm.md?astroPropagatedAssets": "chunks/guardian-of-the-digital-realm__F-pfaew.mjs", "\0astro:asset-imports": "chunks/_astro_asset-imports_Dno0vHp6.mjs", "\0astro:data-layer-content": "chunks/_astro_data-layer-content_tqJQiZwR.mjs", "/home/abdi/Projects/Addition/Addition-Plus-Website/src/content/blog/How to quickly deploy a static website.md": "chunks/How to quickly deploy a static website_DcGe3oLv.mjs", "/home/abdi/Projects/Addition/Addition-Plus-Website/src/content/blog/cannon-excellence.md": "chunks/cannon-excellence_CDLb-1ug.mjs", "/home/abdi/Projects/Addition/Addition-Plus-Website/src/content/blog/cutting-edge-tablets.md": "chunks/cutting-edge-tablets_B_0rVKQw.mjs", "/home/abdi/Projects/Addition/Addition-Plus-Website/src/content/blog/elevate-your-mobile-experience.md": "chunks/elevate-your-mobile-experience_DZzPS4i2.mjs", "/home/abdi/Projects/Addition/Addition-Plus-Website/src/content/blog/guardian-of-the-digital-realm.md": "chunks/guardian-of-the-digital-realm_B83E_zBB.mjs", "/astro/hoisted.js?q=0": "astro/hoisted.CZT4u22o.js", "/astro/hoisted.js?q=1": "astro/hoisted.2daoxv0f.js", "astro:scripts/before-hydration.js": "" }, "inlinedScripts": [], "assets": ["/astro/about.BIM-xzWy.css", "/404.svg", "/Hero.svg", "/Logo.svg", "/cover.png", "/favicon.svg", "/_worker.js/_@astrojs-ssr-adapter.mjs", "/_worker.js/_astro-internal_middleware.mjs", "/_worker.js/index.js", "/_worker.js/middleware.mjs", "/_worker.js/renderers.mjs", "/astro/hoisted.2daoxv0f.js", "/astro/hoisted.BwXjGcf2.css", "/astro/hoisted.CZT4u22o.js", "/blog/image1.png", "/blog/image2.png", "/blog/image3.png", "/blog/image4.png", "/blog/image5.png", "/clients/01.svg", "/clients/02.svg", "/clients/03.svg", "/clients/04.svg", "/clients/05.svg", "/clients/06.svg", "/clients/bubble.svg", "/clients/contact.svg", "/services/01.svg", "/services/02.svg", "/services/03.svg", "/services/04.svg", "/services/05.svg", "/services/06.svg", "/services/Illustration.svg", "/services/ag.svg", "/services/agc.svg", "/services/aw.svg", "/team/c1.png", "/team/c2.png", "/team/c3.png", "/team/contact.svg", "/team/ln.svg", "/team/lng.svg", "/team/minus.svg", "/team/plus.svg", "/team/prof.png", "/team/vector.svg", "/_worker.js/astro/about.BIM-xzWy.css", "/_worker.js/chunks/How to quickly deploy a static website_D5tqu43_.mjs", "/_worker.js/chunks/How to quickly deploy a static website_DQuK3059.mjs", "/_worker.js/chunks/How to quickly deploy a static website_DcGe3oLv.mjs", "/_worker.js/chunks/Layout_fLnNkG_9.mjs", "/_worker.js/chunks/_@astrojs-ssr-adapter_27AeEvWP.mjs", "/_worker.js/chunks/_astro_asset-imports_Dno0vHp6.mjs", "/_worker.js/chunks/_astro_content_DMpHUyuA.mjs", "/_worker.js/chunks/_astro_data-layer-content_tqJQiZwR.mjs", "/_worker.js/chunks/astro-designed-error-pages_BHdqSjjW.mjs", "/_worker.js/chunks/astro_cKueBN-C.mjs", "/_worker.js/chunks/cannon-excellence_BOiohCMI.mjs", "/_worker.js/chunks/cannon-excellence_CDLb-1ug.mjs", "/_worker.js/chunks/cannon-excellence_tSsv6KYc.mjs", "/_worker.js/chunks/cutting-edge-tablets_BY8xOBbU.mjs", "/_worker.js/chunks/cutting-edge-tablets_B_0rVKQw.mjs", "/_worker.js/chunks/cutting-edge-tablets_CDLNkaVM.mjs", "/_worker.js/chunks/elevate-your-mobile-experience_BP2ZP5B2.mjs", "/_worker.js/chunks/elevate-your-mobile-experience_C9ooJEK7.mjs", "/_worker.js/chunks/elevate-your-mobile-experience_DZzPS4i2.mjs", "/_worker.js/chunks/guardian-of-the-digital-realm_B83E_zBB.mjs", "/_worker.js/chunks/guardian-of-the-digital-realm_BZNTAlFU.mjs", "/_worker.js/chunks/guardian-of-the-digital-realm__F-pfaew.mjs", "/_worker.js/chunks/index_BnlZSNsy.mjs", "/_worker.js/chunks/noop-middleware_bsN4OGXR.mjs", "/_worker.js/chunks/parse_B89E6tSO.mjs", "/_worker.js/chunks/utils_nZr4aA_r.mjs", "/_worker.js/pages/404.astro.mjs", "/_worker.js/pages/_image.astro.mjs", "/_worker.js/pages/about.astro.mjs", "/_worker.js/pages/articles.astro.mjs", "/_worker.js/pages/index.astro.mjs", "/_worker.js/chunks/astro/assets-service_B44g93js.mjs", "/_worker.js/chunks/astro/env-setup_nxDOIah1.mjs", "/_worker.js/chunks/astro/server_Den36nYv.mjs", "/_worker.js/pages/articles/_---slug_.astro.mjs", "/_worker.js/pages/articles/api/search.json.astro.mjs"], "buildFormat": "directory", "checkOrigin": false, "serverIslandNameMap": [], "key": "DvfV+DevkW0V09v8afjr1+9RSsl15bcNDyLUq4+vtzQ=", "experimentalEnvGetSecretEnabled": false });

// dist/_worker.js/index.js
init_astro_internal_middleware();
globalThis.process ??= {};
globalThis.process.env ??= {};
var _page0 = /* @__PURE__ */ __name(() => Promise.resolve().then(() => (init_image_astro(), image_astro_exports)), "_page0");
var _page1 = /* @__PURE__ */ __name(() => Promise.resolve().then(() => (init_astro(), astro_exports)), "_page1");
var _page22 = /* @__PURE__ */ __name(() => Promise.resolve().then(() => (init_about_astro(), about_astro_exports)), "_page2");
var _page32 = /* @__PURE__ */ __name(() => Promise.resolve().then(() => (init_search_json_astro(), search_json_astro_exports)), "_page3");
var _page42 = /* @__PURE__ */ __name(() => Promise.resolve().then(() => (init_articles_astro(), articles_astro_exports)), "_page4");
var _page52 = /* @__PURE__ */ __name(() => Promise.resolve().then(() => (init_slug_astro(), slug_astro_exports)), "_page5");
var _page62 = /* @__PURE__ */ __name(() => Promise.resolve().then(() => (init_index_astro(), index_astro_exports)), "_page6");
var pageMap = /* @__PURE__ */ new Map([
  ["node_modules/@astrojs/cloudflare/dist/entrypoints/image-endpoint.js", _page0],
  ["src/pages/404.astro", _page1],
  ["src/pages/about.astro", _page22],
  ["src/pages/articles/api/search.json.ts", _page32],
  ["src/pages/articles/index.astro", _page42],
  ["src/pages/articles/[...slug].astro", _page52],
  ["src/pages/index.astro", _page62]
]);
var serverIslandMap = /* @__PURE__ */ new Map();
var _manifest2 = Object.assign(manifest, {
  pageMap,
  serverIslandMap,
  renderers,
  middleware: () => Promise.resolve().then(() => (init_astro_internal_middleware(), astro_internal_middleware_exports))
});
var _args = void 0;
var _exports = createExports(_manifest2);
var __astrojsSsrVirtualEntry = _exports.default;
var _start = "start";
if (_start in serverEntrypointModule) {
  serverEntrypointModule[_start](_manifest2, _args);
}

// ../../../.nvm/versions/node/v22.4.0/lib/node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts
init_checked_fetch();
init_modules_watch_stub();
var drainBody = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e2) {
      console.error("Failed to drain the unused request body.", e2);
    }
  }
}, "drainBody");
var middleware_ensure_req_body_drained_default = drainBody;

// ../../../.nvm/versions/node/v22.4.0/lib/node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts
init_checked_fetch();
init_modules_watch_stub();
function reduceError(e2) {
  return {
    name: e2?.name,
    message: e2?.message ?? String(e2),
    stack: e2?.stack,
    cause: e2?.cause === void 0 ? void 0 : reduceError(e2.cause)
  };
}
__name(reduceError, "reduceError");
var jsonError = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } catch (e2) {
    const error2 = reduceError(e2);
    return Response.json(error2, {
      status: 500,
      headers: { "MF-Experimental-Error-Stack": "true" }
    });
  }
}, "jsonError");
var middleware_miniflare3_json_error_default = jsonError;

// .wrangler/tmp/bundle-up6FKb/middleware-insertion-facade.js
var __INTERNAL_WRANGLER_MIDDLEWARE__ = [
  middleware_ensure_req_body_drained_default,
  middleware_miniflare3_json_error_default
];
var middleware_insertion_facade_default = __astrojsSsrVirtualEntry;

// ../../../.nvm/versions/node/v22.4.0/lib/node_modules/wrangler/templates/middleware/common.ts
init_checked_fetch();
init_modules_watch_stub();
var __facade_middleware__ = [];
function __facade_register__(...args) {
  __facade_middleware__.push(...args.flat());
}
__name(__facade_register__, "__facade_register__");
function __facade_invokeChain__(request, env, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env, ctx, middlewareCtx);
}
__name(__facade_invokeChain__, "__facade_invokeChain__");
function __facade_invoke__(request, env, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__(request, env, ctx, dispatch, [
    ...__facade_middleware__,
    finalMiddleware
  ]);
}
__name(__facade_invoke__, "__facade_invoke__");

// .wrangler/tmp/bundle-up6FKb/middleware-loader.entry.ts
var __Facade_ScheduledController__ = class {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof __Facade_ScheduledController__)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
__name(__Facade_ScheduledController__, "__Facade_ScheduledController__");
function wrapExportedHandler(worker) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return worker;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  const fetchDispatcher = /* @__PURE__ */ __name(function(request, env, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request, env, ctx);
  }, "fetchDispatcher");
  return {
    ...worker,
    fetch(request, env, ctx) {
      const dispatcher = /* @__PURE__ */ __name(function(type, init2) {
        if (type === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__(
            Date.now(),
            init2.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env, ctx);
        }
      }, "dispatcher");
      return __facade_invoke__(request, env, ctx, dispatcher, fetchDispatcher);
    }
  };
}
__name(wrapExportedHandler, "wrapExportedHandler");
function wrapWorkerEntrypoint(klass) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return klass;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  return class extends klass {
    #fetchDispatcher = (request, env, ctx) => {
      this.env = env;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request);
    };
    #dispatcher = (type, init2) => {
      if (type === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__(
          Date.now(),
          init2.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    };
    fetch(request) {
      return __facade_invoke__(
        request,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
__name(wrapWorkerEntrypoint, "wrapWorkerEntrypoint");
var WRAPPED_ENTRY;
if (typeof middleware_insertion_facade_default === "object") {
  WRAPPED_ENTRY = wrapExportedHandler(middleware_insertion_facade_default);
} else if (typeof middleware_insertion_facade_default === "function") {
  WRAPPED_ENTRY = wrapWorkerEntrypoint(middleware_insertion_facade_default);
}
var middleware_loader_entry_default = WRAPPED_ENTRY;
export {
  __INTERNAL_WRANGLER_MIDDLEWARE__,
  middleware_loader_entry_default as default,
  pageMap
};
/**
 * shortdash - https://github.com/bibig/node-shorthash
 *
 * @license
 *
 * (The MIT License)
 *
 * Copyright (c) 2013 Bibig <bibig@me.com>
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */
/*!
 * cookie
 * Copyright(c) 2012-2014 Roman Shtylman
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */
//# sourceMappingURL=index.js.map
