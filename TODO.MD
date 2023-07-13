Read Files -> DONE

Read Multiple Files In - DONE
Read Multiple Files Out? - DONE

From Read Files, create knowledge Base - TODO

For Clashing Judgments, either ask for a default
Or add TODO {JUDGMENT_1} OR JUDGEMENT_2
-> DONE


Store all judgements over time
-> TODO

Add the Scoring into this - DONE

Add a way to export as CSV and MDs - Basically DONE

Attach to UI / Add the part to parse the title - PROB WILL NEVER DO / Way too much effort for saving 30seconds


NICE TO HAVE (super low prio imo)
EXTENSIBILITY OF SCORE AS CUSTOM ON A PER JUDGE BASIS -> Fairly easy
See `KEYS_AND_SCORES`
You could add a json, yaml or similar as config file to extend that

SCORE EXTENSIBILITY BASED ON ERROR THRESHOLD OR CUSTOM HOOKS
-> This requires a ton of work as you may want to find substrings
-> Or also have a set of keywords for each finding, that would cause them to be considered duplicates
-> Would also require further sophistication on dedouping judgements as otherwise you will just get overwhelmed
-> Prob best done in the UI as a secondary system that advices since it becomes "statistical"



BETTER SCRAPING:

Cases:
|[L-13] Unsafe Cast Unsigned to Signed | [Unsafe Cast Unsigned to Signed](#unsafe-cast-unsigned-to-signed) | 6 |

    - [\[NC-29\] Take advantage of Custom Error's return value property](#nc-29-take-advantage-of-custom-errors-return-value-property)
TODO


| [GAS&#x2011;28](#gas28-splitting-require-statements-that-use-&&-saves-gas) | Splitting `require()` Statements That Use `&&` Saves Gas | 22 | 198 |
TODO

MAYBE:
Is Link ([]()) and compare the length of the string, strong length wins