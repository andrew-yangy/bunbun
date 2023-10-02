import * as React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import kebabCase from 'lodash/kebabCase';
import { useTheme } from '@mui/system';
import { exactProp } from '@mui/utils';
import { useColorScheme } from '@mui/joy/styles';
import ComponentsApiContent from 'docs/src/modules/components/ComponentsApiContent';
import HooksApiContent from 'docs/src/modules/components/HooksApiContent';
import { getTranslatedHeader as getComponentTranslatedHeader } from 'docs/src/modules/components/ApiPage';
import RichMarkdownElement from 'docs/src/modules/components/RichMarkdownElement';
import { pathnameToLanguage } from 'docs/src/modules/utils/helpers';
import AppLayoutDocs from 'docs/src/modules/components/AppLayoutDocs';
import { useTranslate, useUserLanguage } from 'docs/src/modules/utils/i18n';
import BrandingProvider from 'docs/src/BrandingProvider';
import Ad from 'docs/src/modules/components/Ad';
import { HEIGHT as AppFrameHeight } from 'docs/src/modules/components/AppFrame';
import { HEIGHT as TabsHeight } from 'docs/src/modules/components/ComponentPageTabs';
import AdGuest from 'docs/src/modules/components/AdGuest';
import { getPropsToC } from 'docs/src/modules/components/PropertiesTable';
import { getCssToC } from 'docs/src/modules/components/ApiPage/CSSList';

function JoyModeObserver({ mode }) {
  const { setMode } = useColorScheme();
  React.useEffect(() => {
    setMode(mode);
  }, [mode, setMode]);
  return null;
}

JoyModeObserver.propTypes = {
  mode: PropTypes.oneOf(['light', 'dark']),
};

function getHookTranslatedHeader(t, header) {
  const translations = {
    demos: t('api-docs.demos'),
    import: t('api-docs.import'),
    'hook-name': t('api-docs.hookName'),
    parameters: t('api-docs.parameters'),
    'return-value': t('api-docs.returnValue'),
  };

  // TODO Drop runtime type-checking once we type-check this file
  if (!translations.hasOwnProperty(header)) {
    throw new TypeError(
      `Unable to translate header '${header}'. Did you mean one of '${Object.keys(
        translations,
      ).join("', '")}'`,
    );
  }

  return translations[header] || header;
}

export default function MarkdownDocsV2(props) {
  const theme = useTheme();
  const router = useRouter();
  const [activeTab, setActiveTab] = React.useState(router.query.docsTab ?? '');

  const { canonicalAs } = pathnameToLanguage(router.asPath);
  const {
    disableAd = true,
    disableToc = false,
    demos = {},
    docs,
    demoComponents,
    srcComponents,
    componentsApiDescriptions,
    componentsApiPageContents,
    hooksApiDescriptions,
    hooksApiPageContents,
  } = props;

  const userLanguage = useUserLanguage();
  const t = useTranslate();

  React.useEffect(() => {
    setActiveTab(router.query.docsTab ?? '');
  }, [router.query.docsTab]);

  const localizedDoc = docs[userLanguage] || docs.en;
  // Generate the TOC based on the tab
  const demosToc = localizedDoc.toc.filter((item) => item.text !== 'API');

  function createHookTocEntry(hookName, sectionName) {
    return {
      text: getHookTranslatedHeader(t, sectionName),
      hash: `${hookName}-${sectionName}`,
      children: [],
    };
  }

  const hooksToc = [];
  if (hooksApiPageContents) {
    Object.keys(hooksApiPageContents).forEach((key) => {
      const { hookDescriptionToc = [] } = hooksApiDescriptions[key][userLanguage];
      const { name: hookName } = hooksApiPageContents[key];

      const hookNameKebabCase = kebabCase(hookName);

      const hookToc = [
        createHookTocEntry(hookNameKebabCase, 'import'),
        ...hookDescriptionToc,
        createHookTocEntry(hookNameKebabCase, 'parameters'),
        createHookTocEntry(hookNameKebabCase, 'return-value'),
      ].filter(Boolean);

      hooksToc.push({
        text: hookName,
        hash: hookNameKebabCase,
        children: hookToc,
      });
    });
  }

  function createComponentTocEntry(
    componentName,
    sectionName,
    options = { inheritance: false, themeDefaultProps: false },
  ) {
    return {
      text: getComponentTranslatedHeader(t, sectionName),
      hash: `${componentName}-${sectionName}`,
      children: [
        ...(options.inheritance
          ? [{ text: t('api-docs.inheritance'), hash: 'inheritance', children: [] }]
          : []),
        ...(options.themeDefaultProps
          ? [{ text: t('api-docs.themeDefaultProps'), hash: 'theme-default-props', children: [] }]
          : []),
      ],
    };
  }

  const componentsApiToc = [];

  if (componentsApiPageContents) {
    Object.keys(componentsApiPageContents).forEach((key) => {
      const { componentDescriptionToc = [] } = componentsApiDescriptions[key][userLanguage];
      const {
        name: componentName,
        styles,
        inheritance,
        slots,
        themeDefaultProps,
        classes,
        props: componentProps,
      } = componentsApiPageContents[key];
      const componentNameKebabCase = kebabCase(componentName);

      const componentApiToc = [
        createComponentTocEntry(componentNameKebabCase, 'import'),
        ...componentDescriptionToc,
        styles.name && createComponentTocEntry(componentNameKebabCase, 'component-name'),
        getPropsToC({
          t,
          componentName: componentNameKebabCase,
          componentProps,
          inheritance,
          themeDefaultProps,
          hash: `${componentNameKebabCase}-props`,
        }),
        ...getCssToC({
          t,
          componentName: componentNameKebabCase,
          componentStyles: styles,
          hash: `${componentNameKebabCase}-css`,
        }),

        slots?.length > 0 && createComponentTocEntry(componentNameKebabCase, 'slots'),
        (classes?.classes?.length || Object.keys(classes?.classes?.globalClasses || {}).length) &&
          createComponentTocEntry(componentNameKebabCase, 'classes'),
      ].filter(Boolean);

      componentsApiToc.push({
        text: componentName,
        hash: componentNameKebabCase,
        children: componentApiToc,
      });
    });
  }

  const isJoy = true;

  const Wrapper = isJoy ? BrandingProvider : React.Fragment;
  const wrapperProps = {
    ...(isJoy && { mode: theme.palette.mode }),
  };

  const commonElements = [];

  let i = 0;
  let done = false;

  // process the elements before the tabs component
  while (i < localizedDoc.rendered.length && !done) {
    const renderedMarkdownOrDemo = localizedDoc.rendered[i];
    if (renderedMarkdownOrDemo.component && renderedMarkdownOrDemo.component.indexOf('Tabs') >= 0) {
      done = true;
    }
    commonElements.push(
      <RichMarkdownElement
        key={`common-elements-${i}`}
        activeTab={activeTab}
        demoComponents={demoComponents}
        demos={demos}
        disableAd={disableAd}
        localizedDoc={localizedDoc}
        renderedMarkdownOrDemo={renderedMarkdownOrDemo}
        srcComponents={srcComponents}
        theme={theme}
        WrapperComponent={Wrapper}
        wrapperProps={wrapperProps}
      />,
    );
    i += 1;
  }

  let activeToc = demosToc;

  if (activeTab === 'hooks-api') {
    activeToc = hooksToc;
  }

  if (activeTab === 'components-api') {
    activeToc = componentsApiToc;
  }

  const hasTabs = localizedDoc.rendered.some((renderedMarkdownOrDemo) => {
    if (
      typeof renderedMarkdownOrDemo === 'object' &&
      renderedMarkdownOrDemo.component &&
      renderedMarkdownOrDemo.component === 'modules/components/ComponentPageTabs.js'
    ) {
      return true;
    }
    return false;
  });

  return (
    <AppLayoutDocs
      description={localizedDoc.description}
      disableAd={disableAd}
      disableToc={disableToc}
      location={localizedDoc.location}
      title={localizedDoc.title}
      toc={activeToc}
      disableLayout
      hasTabs={hasTabs}
    >
      <div
        style={{
          '--MuiDocs-header-height': hasTabs
            ? `${AppFrameHeight + TabsHeight}px`
            : `${AppFrameHeight}px`,
        }}
      >
        <div>
          {commonElements}
          {activeTab === '' &&
            localizedDoc.rendered
              // for the "hook only" edge case, e.g. Base UI autocomplete
              .slice(
                i,
                localizedDoc.rendered.length - (localizedDoc.headers.components.length > 0 ? 1 : 0),
              )
              .map((renderedMarkdownOrDemo, index) => (
                <RichMarkdownElement
                  key={`demos-section-${index}`}
                  activeTab={activeTab}
                  demoComponents={demoComponents}
                  demos={demos}
                  disableAd={disableAd}
                  localizedDoc={localizedDoc}
                  renderedMarkdownOrDemo={renderedMarkdownOrDemo}
                  srcComponents={srcComponents}
                  theme={theme}
                  WrapperComponent={Wrapper}
                  wrapperProps={wrapperProps}
                />
              ))}
          {activeTab === 'components-api' && (
            <ComponentsApiContent
              descriptions={componentsApiDescriptions}
              pageContents={componentsApiPageContents}
            />
          )}
          {activeTab === 'hooks-api' && (
            <HooksApiContent
              descriptions={hooksApiDescriptions}
              pagesContents={hooksApiPageContents}
            />
          )}
        </div>
      </div>
    </AppLayoutDocs>
  );
}

MarkdownDocsV2.propTypes = {
  componentsApiDescriptions: PropTypes.object,
  componentsApiPageContents: PropTypes.object,
  demoComponents: PropTypes.object,
  demos: PropTypes.object,
  disableAd: PropTypes.bool,
  disableToc: PropTypes.bool,
  docs: PropTypes.object.isRequired,
  hooksApiDescriptions: PropTypes.object,
  hooksApiPageContents: PropTypes.object,
  srcComponents: PropTypes.object,
};

if (process.env.NODE_ENV !== 'production') {
  MarkdownDocsV2.propTypes = exactProp(MarkdownDocsV2.propTypes);
}
