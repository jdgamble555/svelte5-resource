export let resource = <T>(
    getter: () => RequestInfo | URL,
    initialValue?: T
) => {

    const _rune = $state<{ value: T | undefined }>({
        value: initialValue
    });

    const controller = new AbortController();
    const { signal } = controller;

    $effect(() => {
        const url = getter();
        fetch(url, { signal })
            .then((response) =>
                response.json()
            )
            .then((data) => {
                _rune.value = data;
            });
        return () => controller.abort();
    });

    return _rune;
};

// get other ideas from https://x.com/_georgemoller/status/1884935215778243013