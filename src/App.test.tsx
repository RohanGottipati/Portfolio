import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

import { App } from "./App";

describe("redesigned portfolio", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    window.history.replaceState({}, "", "/");
  });

  it("renders and dismisses the intro before showing primary navigation", async () => {
    const user = userEvent.setup();
    render(<App paperGrain={false} />);

    expect(
      screen.getByRole("dialog", { name: "Portfolio introduction" }),
    ).toHaveAttribute("aria-modal", "true");
    expect(
      screen.getByRole("progressbar", { name: "Loading portfolio" }),
    ).toHaveAttribute("aria-valuenow", "100");

    await user.click(
      screen.getByRole("button", { name: /click anywhere to skip/i }),
    );
    await waitFor(() => {
      expect(
        screen.queryByRole("dialog", { name: "Portfolio introduction" }),
      ).not.toBeInTheDocument();
    });

    expect(
      screen.getByRole("heading", {
        name: /I'm Rohan, a software engineer who ships/i,
      }),
    ).toBeInTheDocument();
    const primaryNav = screen.getByRole("navigation", { name: "Primary" });
    const aboutLink = within(primaryNav).getByRole("link", { name: "About" });
    const projectsLink = within(primaryNav).getByRole("link", {
      name: "Projects",
    });
    const experienceLink = within(primaryNav).getByRole("link", {
      name: "Experience",
    });
    const resumeLink = within(primaryNav).getByRole("link", { name: "Resume" });
    const roroButton = within(primaryNav).getByRole("button", { name: "RoRo" });

    expect(projectsLink).toHaveAttribute(
      "href",
      "/work",
    );
    expect(experienceLink).toHaveAttribute(
      "href",
      "/experience",
    );
    expect(aboutLink).toHaveAttribute(
      "href",
      "/about",
    );
    expect(resumeLink).toHaveAttribute("href", "/Rohan_Gottipati_Resume.pdf");
    expect(resumeLink).toHaveAttribute("target", "_blank");
    expect(resumeLink).toHaveAttribute("rel", "noreferrer");
    expect(
      aboutLink.compareDocumentPosition(projectsLink) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
    expect(
      projectsLink.compareDocumentPosition(experienceLink) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
    expect(
      experienceLink.compareDocumentPosition(resumeLink) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
    expect(
      resumeLink.compareDocumentPosition(roroButton) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
    expect(screen.getAllByText("Toronto, ON").length).toBeGreaterThan(0);
    expect(
      screen.getByText(/I'm at Intact Financial now, recently wrapped/),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "IT Technical Advisor Intern, Software Engineering & Integrations",
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Building multi-system integrations across enterprise systems."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Supporting application architecture in Java and Python."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Working with AWS, Kubernetes, and CI/CD cloud tooling."),
    ).toBeInTheDocument();
    expect(screen.getByText("Big Data Concentration")).toBeInTheDocument();
    expect(screen.getByText("AI/ML systems")).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: "This Portfolio" }),
    ).not.toBeInTheDocument();
    expect(window.scrollTo).not.toHaveBeenCalled();
    expect(document.querySelector("[data-cursor]")).not.toBeInTheDocument();
    expect(document.querySelector("[data-hero-grid]")).toHaveClass(
      "md:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]",
    );
    expect(document.querySelector("[data-rotating-verb-slot]")).toHaveClass(
      "w-[4.9em]",
    );

    const nextStop = screen.getByRole("heading", {
      name: "I'm at Intact Financial.",
    });
    const selectedProjects = screen.getByRole("heading", {
      name: "Things I built, shipped and broke.",
    });
    expect(
      nextStop.compareDocumentPosition(selectedProjects) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
  });

  it("renders every mobile navigation action on its own row", async () => {
    const user = userEvent.setup();
    window.history.replaceState({}, "", "/work");
    render(<App paperGrain={false} />);

    await user.click(screen.getByRole("button", { name: "Open menu" }));
    const mobileNavigation = document.getElementById("mobile-navigation");
    expect(mobileNavigation).not.toBeNull();

    const resume = within(mobileNavigation!).getByRole("link", {
      name: "Resume",
    });
    const roro = within(mobileNavigation!).getByRole("button", {
      name: "RoRo",
    });

    expect(resume.closest("li")).not.toBe(roro.closest("li"));
    expect(mobileNavigation?.children).toHaveLength(5);
  });

  it("keeps experience and about on separate pages", async () => {
    const user = userEvent.setup();
    window.history.replaceState({}, "", "/experience");
    render(<App paperGrain={false} />);

    expect(
      await screen.findByRole("heading", {
        name: "What I've built across roles.",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: /Intact Financial Corporation/,
      }),
    ).toBeInTheDocument();
    expect(screen.getAllByText("Waterloo, ON")).toHaveLength(3);
    expect(
      screen.getByText(
        /Built scalable data pipelines to evaluate affective-computing models/,
      ),
    ).toBeInTheDocument();
    expect(
      screen.queryByText(
        /Build research infrastructure for affective-computing models/,
      ),
    ).not.toBeInTheDocument();
    expect(screen.queryByText("Data Pipelines")).not.toBeInTheDocument();
    expect(screen.getByText("Data Structures I & II")).toBeInTheDocument();
    expect(screen.getByText("Linear Algebra")).toBeInTheDocument();
    expect(screen.getByText("Big Data Concentration")).toBeInTheDocument();
    expect(screen.queryByText("Calculus")).not.toBeInTheDocument();
    await waitFor(() => {
      expect(document.title).toBe("Experience | Rohan Gottipati");
    });

    await user.click(screen.getByRole("link", { name: "About" }));
    expect(
      await screen.findByRole("heading", {
        name: "I like turning half-formed ideas into working software.",
      }),
    ).toBeInTheDocument();
    expect(
      screen.queryByText(
        /I'm a software engineer who likes building fast, useful products/,
      ),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("heading", {
        name: "What I've built across roles.",
      }),
    ).not.toBeInTheDocument();
  });

  it("navigates to work and filters projects", async () => {
    const user = userEvent.setup();
    window.history.replaceState({}, "", "/work");
    render(<App paperGrain={false} />);

    expect(
      await screen.findByRole("heading", {
        name: "15 so far, more in progress.",
      }),
    ).toBeInTheDocument();

    const portfolioHeading = screen.getByRole("heading", {
      name: "This Portfolio",
    });
    expect(portfolioHeading).toBeInTheDocument();
    expect(portfolioHeading.closest("a")?.querySelector("img")).toHaveAttribute(
      "src",
      "/c7482166-3a87-4a04-8b46-94156b0b0e28.jpg",
    );

    expect(screen.queryByText("Next.js")).not.toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "AI + ML" }));
    expect(screen.getByText("10 projects shown")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "GreenLens AI" })).toBeInTheDocument();
    expect(
      screen.getByText("Best Use of MongoDB Atlas, Hack the 6ix"),
    ).not.toHaveClass("truncate");
    expect(
      screen.queryByRole("heading", { name: "Letterly" }),
    ).not.toBeInTheDocument();
  });

  it("renders a project case study and updates route metadata", async () => {
    window.history.replaceState({}, "", "/work/greenlens-ai");
    render(<App paperGrain={false} />);

    expect(
      await screen.findByRole("heading", { name: "GreenLens AI" }),
    ).toBeInTheDocument();

    await waitFor(() => {
      expect(document.title).toBe("GreenLens AI | Rohan Gottipati");
      expect(
        document.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.href,
      ).toBe("https://rohangottipati.com/work/greenlens-ai");
    });
  });

  it("renders ScotiaCheck with its exact placement and no external link", async () => {
    window.history.replaceState({}, "", "/work/scotiacheck");
    render(<App paperGrain={false} />);

    expect(
      await screen.findByRole("heading", { name: "ScotiaCheck" }),
    ).toBeInTheDocument();
    expect(screen.getByText("2nd Place at S:\\HA<KS 2026")).toBeInTheDocument();
    expect(screen.queryByText("Links")).not.toBeInTheDocument();
  });

  it("opens and closes the RoRo dialog accessibly", async () => {
    const user = userEvent.setup();
    render(<App paperGrain={false} />);

    await user.click(
      screen.getByRole("button", { name: /click anywhere to skip/i }),
    );
    await waitFor(() => {
      expect(
        screen.queryByRole("dialog", { name: "Portfolio introduction" }),
      ).not.toBeInTheDocument();
    });

    expect(
      screen.queryByRole("button", { name: "Ask RoRo" }),
    ).not.toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "RoRo" }));
    expect(
      screen.getByRole("dialog", { name: "RoRo portfolio guide" }),
    ).toHaveAttribute("aria-modal", "true");
    expect(document.querySelector("[data-roro-panel]")).toHaveClass(
      "lg:w-[clamp(390px,28vw,500px)]",
    );
    expect(document.querySelector("[data-site-shell]")).toHaveClass(
      "lg:mr-[clamp(390px,28vw,500px)]",
    );
    expect(
      screen.getByRole("heading", { name: "Ask me anything." }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/I'm RoRo, the AI guide for this portfolio/),
    ).toBeInTheDocument();
    expect(screen.getAllByText("Portfolio assistant")).toHaveLength(1);
    expect(document.querySelector("[data-roro-scroll-region]")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Ask about Rohan...")).toBeInTheDocument();

    await user.keyboard("{Escape}");
    await waitFor(() => {
      expect(
        screen.queryByRole("dialog", { name: "RoRo portfolio guide" }),
      ).not.toBeInTheDocument();
    });
  });

  it("anchors a long RoRo answer at its beginning", async () => {
    const user = userEvent.setup();
    const scrollHeight = vi
      .spyOn(HTMLElement.prototype, "scrollHeight", "get")
      .mockImplementation(function (this: HTMLElement) {
        if (this.hasAttribute("data-roro-answer-body")) return 520;
        if (this.hasAttribute("data-roro-scroll-region")) return 1400;
        return 0;
      });
    const clientHeight = vi
      .spyOn(HTMLElement.prototype, "clientHeight", "get")
      .mockImplementation(function (this: HTMLElement) {
        return this.hasAttribute("data-roro-scroll-region") ? 720 : 0;
      });
    const elementRect = vi
      .spyOn(HTMLElement.prototype, "getBoundingClientRect")
      .mockImplementation(function (this: HTMLElement) {
        const top = this.hasAttribute("data-roro-answer") ? 300 : 100;
        return {
          bottom: top + 100,
          height: 100,
          left: 0,
          right: 390,
          top,
          width: 390,
          x: 0,
          y: top,
          toJSON: () => ({}),
        };
      });

    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => ({
        answer:
          "Here is a detailed portfolio answer.\n\n• First relevant point\n• Second relevant point\n• Third relevant point",
      }),
    } as Response);

    try {
      render(<App paperGrain={false} />);
      await user.click(
        screen.getByRole("button", { name: /click anywhere to skip/i }),
      );
      await waitFor(() => {
        expect(
          screen.queryByRole("dialog", { name: "Portfolio introduction" }),
        ).not.toBeInTheDocument();
      });

      await user.click(screen.getByRole("button", { name: "RoRo" }));
      await user.type(
        screen.getByPlaceholderText("Ask about Rohan..."),
        "List the most relevant portfolio details",
      );
      await user.click(screen.getByRole("button", { name: "Send question" }));

      expect(
        await screen.findByText(/Here is a detailed portfolio answer/),
      ).toBeInTheDocument();
      await waitFor(() => {
        expect(HTMLElement.prototype.scrollTo).toHaveBeenCalledWith({
          top: 176,
          behavior: "smooth",
        });
      });
    } finally {
      scrollHeight.mockRestore();
      clientHeight.mockRestore();
      elementRect.mockRestore();
    }
  });

  it("offers to ask RoRo about double-clicked text", async () => {
    const user = userEvent.setup();
    window.history.replaceState({}, "", "/work");
    render(<App paperGrain={false} />);

    const heading = await screen.findByRole("heading", {
      name: "GreenLens AI",
    });
    const range = document.createRange();
    range.selectNodeContents(heading);
    Object.defineProperty(range, "getBoundingClientRect", {
      value: () => ({
        bottom: 140,
        height: 20,
        left: 100,
        right: 220,
        top: 120,
        width: 120,
        x: 100,
        y: 120,
        toJSON: () => ({}),
      }),
    });
    const selection = window.getSelection();
    selection?.removeAllRanges();
    selection?.addRange(range);

    fireEvent.doubleClick(heading, { clientX: 160, clientY: 120 });

    await user.click(
      await screen.findByRole("button", {
        name: "Ask RoRo about GreenLens AI",
      }),
    );

    expect(
      screen.getByRole("dialog", { name: "RoRo portfolio guide" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Selected from page"),
    ).toBeInTheDocument();
    expect(
      screen.getByText('“GreenLens AI”'),
    ).toBeInTheDocument();
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        "/api/roro",
        expect.objectContaining({ method: "POST" }),
      );
    });
  });

  it("offers to ask RoRo after selecting across multiple elements", async () => {
    const user = userEvent.setup();
    window.history.replaceState({}, "", "/work");
    render(<App paperGrain={false} />);

    const heading = await screen.findByRole("heading", {
      name: "GreenLens AI",
    });
    const card = heading.closest("a");
    const summary = card?.querySelector("p");
    expect(card).not.toBeNull();
    expect(summary).not.toBeNull();

    const range = document.createRange();
    range.setStartBefore(heading);
    range.setEndAfter(summary!);
    const selection = window.getSelection();
    selection?.removeAllRanges();
    selection?.addRange(range);

    fireEvent.pointerUp(summary!, {
      clientX: 260,
      clientY: 180,
      pointerType: "mouse",
    });

    const askSelection = await screen.findByRole("button", {
      name: /Ask RoRo about GreenLens AI/,
    });
    await user.click(askSelection);

    expect(
      screen.getByRole("dialog", { name: "RoRo portfolio guide" }),
    ).toBeInTheDocument();
  });

  it("marks unknown routes as not indexable", async () => {
    window.history.replaceState({}, "", "/missing-page");
    render(<App paperGrain={false} />);

    expect(
      await screen.findByRole("heading", {
        name: "I couldn't find that page.",
      }),
    ).toBeInTheDocument();
    await waitFor(() => {
      expect(document.getElementById("meta-robots")).toHaveAttribute(
        "content",
        "noindex, nofollow",
      );
    });
  });
});
