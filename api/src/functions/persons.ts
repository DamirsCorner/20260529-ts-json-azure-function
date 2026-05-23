import {
  app,
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from "@azure/functions";
import persons from "./persons.json";

export async function getPerson(
  request: HttpRequest,
  context: InvocationContext,
): Promise<HttpResponseInit> {
  const id = request.query.get("id");
  const person = persons.find((p) => p.id == id);

  if (person) {
    return {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    };
  } else {
    return {
      status: 404,
    };
  }
}

app.http("persons", {
  methods: ["GET"],
  authLevel: "anonymous",
  handler: getPerson,
});
